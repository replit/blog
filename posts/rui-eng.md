---
title: "Implementing RUI, Replit's Design System"
author: Alex Kotliarskyi
date: 2021-12-23
cover: https://blog.replit.com/images/rui/eng/rui-eng-social.png
categories: design, eng
---

At Replit, we have a small engineering and design team supporting millions of users. Our secret is investing in good tools that make us more productive. In this blog post we'll give you an insider look into how we implemented one such tool - the Replit design system (or RUI for short).

The project started as a collection of growth pains:

1. Designers were stretched thin on multiple projects and they couldn't be involved in small tactical decisions
2. UI was inconsistent across the product
3. Reusing UI code was hard, so engineers built new ones (for example, we had 7 different Avatar components)

So, we set to build a design system that would help us scale. The high level goals:

1. Cover 90% of what we need (don't chase the very special cases)
2. Easy, intuitive and fun to use
3. Retain the full power of CSS when it's needed

## Technical path

Replit's frontend is built on top of React, a very popular library for building user interfaces. The React ecosystem has dozens of libraries and toolkits for making UIs. So many, that picking one is a hard problem!

Here's a list of libraries and approaches we have considered, and the pros and cons we weighed:

### Styled JSX

`styled-jsx` comes built-in with Next.js (which we also use), so most of Replit was styled with it.

```typescript
function AppsList(props) {
  return (
    <ul className="list">
      <AppComponent />
      <style jsx>{`
        .list {
          color: ${props.cool ? 'blue' : 'black'}
          padding: var(--spaceing-2);
        }
      `}</style>
    </ul>
  )
}
```

*Pros:*

1. Easy to hack together: there's nothing to import, just put the CSS next to your components.
2. Class names communicate purpose (e.g. `.section`, `.title`)
3. Just copy-paste CSS from anywhere

*Cons:*

1. Too easy to reinvent the wheel (which resulted in 7 different `<Avatar>` component implementations)
2. Composition is [hard and confusing](https://replit.com/@frant1c/CssIsHard)
3. The defaults are not app-friendly (e.g. `box-sizing`, `display: box`)
4. Easy to have typos in CSS that can only be inspected visually (did you notice `--spaceing-2` above?)

### Styled Components

`styled-components` was the first library that pioneered a "styled" API: making custom React components with CSS attached. Today, other libraries support a similar way of attaching CSS to components.

```typescript
const AppsList = styled.ul((props) => {
  color: props.cool ? 'blue' : 'black',
  padding: tokens.spacing2;
});
```

*Pros:*

1. Can use TypeScripted APIs (typecheck, IDE support)
2. Components have semantic names (good for readability)
3. Extending components is easy (e.g. `styled(AppList)`)

*Cons:*

1. Cumbersome for rapid prototyping - need to define intermediate components and use props to customize styling

### Tailwind

Tailwind has gained a lot of momentum and is very popular among front-end engineers. The utility classes seem unorthodox and hard to use initially, but once you get used to it it's actually very fun to style components with Tailwind.

```typescript
function AppsList(props) {
  return (
    <ul className={`p-2 ${props.cool ? 'fg-blue' : 'fg-black'}`}>
      <AppComponent />
    </ul>
  )
}
```

*Pros:*

1. Utility classes are addictively productive
2. Constrained space to choose from
3. Densely packed code

*Cons:*

1. Learning curve - need to remember the classnames
2. Composition suffers the same CSS problems
3. Hard to figure the purpose of divs (e.g. `p-2 flex-row` is what?)
4. All starts from basic HTML defaults

### Style props (like Chakra UI)

Many design systems start from building a "universal React component", e.g. `<Box>` in Chakra UI. Other components then build on top of it, adding and removing some props.

```typescript
function AppsList(props) {
  return (
    <Box padding={2} color={props.cool ? 'blue' : 'black'}>
      <AppComponent />
    </Box>
  )
}
```

*Pros:*

1. Well typed API
2. Control over which customizations are allowed (e.g. could allow `padding` but not `color`)
3. Could handle things like accessibility for us

*Cons:*

1. Domain and styling props mixed together
2. Raw CSS power is hard to reach
3. Composing conditional props is awkward
4. Making extensible components requires props spreading

### CSS prop (Emotion)

```typescript
function AppsList(props) {
  return (
    <div css={{padding: 'var(--spacing-2)', color: props.cool ? 'blue' : 'black'}}>
      <AppComponent />
    </div>
  )
}
```

*Pros:*

1. Easy to hack
2. [Intuitive CSS composition](https://replit.com/@frant1c/CssIsEasierWithEmotion)

*Cons:*

1. Requires Babel config change
2. CSS prop is "magic"
3. Inline CSS can get verbose


### String literals vs Objects

Emotion (and many other libraries) support 2 ways of defining CSS:

**String literals:**

```js
css={css`
  color: ${props.cool ? 'blue' : undefined};
  padding: var(--spaceing-2);
`}
```

*Pros*: easy to copy-paste;  
*Cons*: typos, string interpolation awkwardness

**JavaScript Objects:**

```js
css={{
  padding: 'var(--spacing-2)', 
  color: props.cool ? 'blue' : 'black',
  '&:hover': {

  },
}}
```

*Pros*: TypeScript, can do some pre-processing with code;  
*Cons*: hard to copy-paste, more keypresses to type out

# RUI API

In the end we landed on a system that's using Emotion with object-like styles, has a basic `<View>` primitive, and provides tailwind-like utility traits that can be mixed in.

Here's an example:

```typescript
function AppsList(props) {
  return (
    <View tag="ul" css={[
      rcss.p(2), rcss.rowWithGap(1), 
      rcss.color.foregroundDimmer, 
      props.cool && rcss.color.accentPrimaryDimmer
    ]}>
      <AppComponent />
    </View>
  )
}
```

- `View` is our basic building block. Inspired by React Native Web, it has a bunch of basic styles applied, e.g. `display: flex`, `box-sizing: border-box`, etc. `View` accepts an optional `tag` prop that makes sure the component is rendered as an appropriate semantic HTML element.
- The `css` prop is powered by Emotion. It accepts an object or an array of objects that contain CSS. Thanks to TypeScript support, we get a great IDE integration and safety guarantees (no more typos!)
- `rcss` (stands for Replit CSS) is a set of utilities that are commonly used, like color, padding, alignment, etc.

The utilities are super useful and have replaced most of our old "layout components". For example, we have a utility called `rcss.rowWithGap` that aligns children components in a row with a gap between them. In the past, we used a special `<VStack>` component for that. Using the utility is much nicer because it can be mixed into component style without making the React tree more complex.

Here's another example. As you can see below, we can "mix-in" a bunch of shared styles (like interactive list item), and Emotion makes sure we can override bits we want to customize:

```typescript
function Button({ big, caption, className }) {
  return (
    <View
      tag="button"
      css={[
        buttonReset,
        interactive.listItem,
        rcss.p(big ? 8 : 4),
        rcss.borderRadius(8),
        { alignSelf: 'start' },
      ]}
      className={className}
    >
      {caption}
    </View>
  );
}
```

If needed, the new `<Button>` can also be styled with `css` prop: `<Button css={{color: red}} />` (that's why we need to pipe `className` — Emotion is a little unintuitive here).

 ## Our experience so far

It's been ~ 4 months since we started using RUI and our experience has mainly been very positive. Engineers love the new system and feel productive from day one.

The IDE support means that the APIs are discoverable and type-safe, so we have more confidence than ever shipping new code.

Alongside the design system we've also built an internal page that has component examples and documentation (generated from source code).

![RUI component library: components and documentation in one place](./images/rui/eng/ui-page.png)

All our new code is written using RUI, and we opportunistically upgrade the old `<styled jsx>`, which results in much less code.

  
## Acknowledgements

Big props to Ashlynn for brainstorming the API and implementation ideas and Barron for setting the design system principles principles and being a kick-ass designer-who-codes.

> We expect that real success will only be achieved through close collaboration between system-sensitized visual and conceptual designers and design-centered software engineers and managers.  
— Designing Visual Interfaces, 1995, Sun Microsystems

