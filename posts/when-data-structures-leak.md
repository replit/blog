# When data structures spill into the user experience

Building a robust and powerful UI without compromising on simplicity is complicated, and we're always [exploring solutions](https://blog.replit.com/clui) that alleviate that problem. A few years ago, we [rewrote our workspace architecture](https://blog.replit.com/ide), and Amjad gave [a talk about it](https://www.youtube.com/watch?v=dhECubL0R3U). We're about to add a lot of firepower to our layout system (stay tuned!), but we noticed significant shortcomings in our abstractions. This blog post will outline the flaws and how the underlying data structure hurt the interactions. To keep this post concise, I will defer the reasoning behind the UI and UX to a future post.


First, let's lay down some fundamentals. We want a tiled layout system where a group of panes (a.k.a tiles) are laid on the screen next to each other, vertically and/or horizontally, without overlapping. Each pane should have another pane adjacent to it or be at the edge of the screen. The screen is finite, and pane sizes vary. From the UI, people should be able to resize their panes and drag them to move them around. People should be able to add more panes next to other panes. It should be able to support tabs and floating panes, but these are not relevant to what we're talking about today. 


To keep it clear, we do not want a grid system (a-la spreadsheets) where everything is row-column-based, but it should be possible to recreate it as tiled layout can be a superset of row-column-based layout.


There are many ways to represent this data. The first way is a list of panes, where each pane has an x, y, width, and height. This representation is straightforward to understand but does not fit our needs; it doesn't express the relationship between our panes. When translating the structure into a layout, we won't have indicators on how a pane relates to its neighbors without excruciating calculation. It works for a floating layout design, though you also probably need a z value in addition to x and y since panes will overlap.


The second way is a 2D array of panes, where each cell corresponds to a position on the screen. The array is finite, and each cell can only contain one pane. This representation solves the relationship problem; we can quickly traverse each row and column to get a specific pane's neighbors. The downfall of this representation is that it forces you into a row-column-based system and is not conducive to a tiled layout.


The third way is a tree data structure. The tree's root is the screen, the leaf nodes represent panes, and each intermediate node represents a group of panes (and subgroups). The tree expresses the relationships between panes very well. Each node takes a percentage share from the parent. 

The tree data structure is ideal, and it is what we use, so where did we go wrong? The mistake was using a more specific type trees, a binary tree. A binary tree is a tree where each node has at most two children. It's simple to understand, express, and do operations on. That said, the constraint of two children severely limits the ways to express our layout. For example, a common use case is having three columns side-by-side. We would have to put the middle column as a child of the left or right group node with a binary tree. Sounds like a solution? Yes, but now our relationships are all wrong, which can spill into user interactions. And it did.


Assume we have three panes next to each other, A, B, and C. To express them in a binary layout, they would look like `[A,[B,C]]`, where the brackets represent grouping (not seen by the end user) and the commas represent the resizer. Here's what the user sees:
```
------+-----+------
|  A  +  B  +  C  |
------+-----+------
```
This poses a problem because moving the resizer between A and B influences C since C is in a shared group with B. On the other hand, moving the resizer between B and C does not influence A. This interaction is unintuitive and non-obvious to users, especially when you start having more panes.


One way to fix this is to find the deepest node in the opposing direction. Consider this structure, `[A,[[B,C],D]]`. If the user held on to the resizer next to A, they would expect to resize A and B, not A and the whole group next to it. Another way to put it is that users expect to resize nodes that are visually next to each other. Finding A is simple since it's at the resizer's root. To find B, we have to traverse down in the opposing direction. Then when the user moves the resizer, we have to recalculate the proportions of the nodes involved, including intermediary nodes (all ancestors of B).


One little detail we missed is that we also have to consider nodes tiled in an opposing direction to the current split. For example, if we have [A,[B,C]], where A is horizontally stacked with B and C, but B and C are vertically stacked, then resizing should affect the group holding B and C, not B alone!


The bad news: taming the binary tree into a layout with the expected user interactions is too much work. Devs will have a hard time understanding the code, and the computer will have too many traversals and mutations on the structure.

The good news: we don't have to use a binary tree, but we need more constraints to make sure we don't fall into the same pitfalls.

The best way about this is to represent things the way users see them, in this case, an n-ary tree is the way to go. n-ary trees have a list of children instead of only 2 (left and right). In the A, B, C example, we can represent all of the panes as siblings in the data structure (`[A,B,C]`). It's much easier to translate that into a layout that behaves in the way we expect. If the user moves the resizer between A and B, we must only resize the direct siblings; nothing else is affected. Works as expected, easy to reason about, and performant. 

I mentioned needing more constraints, why, and what are they? Assume we have `[A,B,C]` again, and the user is adding a new pane next to C. Nothing says that we can't end up with `[A,B,[C,D]]`, this is technically an n-ary tree, but this sets us back to where we started. So the other constraint needed is that the structure must always be flat. The only exception to that rule is that if C and D were stacked in a different direction, that's the only time where branching is allowed.

There is no data structure for every use case, and the tradeoffs might not be immediately apparent but don't get stuck in a sunk cost. And every use case might require multiple data structures, for example, I mentioned "a list of panes, where each pane has an x, y, width, and height." as the first candidate, and I explained why we wouldn't use it. Still, the reality is that we ended up using it in addition to a tree in our layout system. The reasoning is a bit too domain-specific, but the idea is that we want to maintain DOM node references to the panes as they move around so that they can retain state (i.e., canvas or iframe), and there's less DOM manipulation (performance), most changes will be CSS.

Here are the data structures we landed on, expressed in TypeScript looks a little like this
```ts
interface BaseGroupNode {
  // Percentage size node will take from parent
  percentage: number,
  // All children
  children: Array<Node>,
  // Whether this group is horizontally tiled or vertically
  isHorizontal: boolean
}

interface PaneNode {
  // Percentage size node will take from parent
  percentage: number,
  // HTML element that will be rendered here
  dom: HTMLElement
}

interface HorizontalGroupNode extends BaseGroupNode {
  // Horizontal groups cannot nest other horizontal groups
  children: Array<PaneNode | VerticalGroupNode>,
  isHorizontal: true
}

interface VerticalGroupNode extends BaseGroupNode {
  // Vertical groups cannot nest other vertical groups
  children: Array<PaneNode | HorizontalGroupNode>,
  isHorizontal: false
}

type Node = PaneNode | VerticalGroupNode | HorizontalGroupNode
```