---
title: The Journey To Code Search
author: Jake Hamilton
date: 2023-06-25
cover: https://blog.replit.com/images/the-journey-to-code-search/search-computer.png
categories: news,eng
profiles: JakeAtReplit,bradyatreplit,nathan-pham
---

![](https://blog.replit.com/images/the-journey-to-code-search/search-computer.png)

Finding that one comment, class, or function in your codebase is important. You might not always know where to look... which
is why we created a brand new Code Search tool! From simple queries to regular expressions it has never been easier to get
work done on Replit. The new Code Search tool supports queries with word filters, regular expressions, include patterns,
exclude patterns, as well as replacements (with regular expression capture group support) so that you can find what you
need and make refactors on larger codebases quickly and efficiently. Try it out now on Replit! But don't forget to come
back to this post so we can bring you on our Journey to Code Search.

![Code Search preview](https://blog.replit.com/images/the-journey-to-code-search/code-search-preview.png)

## How It All Started

At Replit we love building things. So much so that we get together to do it pretty regularly! During a Hack Week in 2023
@nathan-pham, @monkatraz, @masad-frost, and @cdmistman all got down to business working out how we could make the search
experience in the workspace better. From there, the project was born and quickly became a reality. Though, there are a
surprising number of problems to solve in order to make Code Search fast, efficient, and as useful as we wanted it to be.

Nathan Pham did a whole bunch of work to build out the systems needed to make Code Search work. His internship ended this
last April, but we're very thankful for all of the work he did and the great energy he brought while he was here. Nathan
also wrote up some posts detailing [what it is like to intern at Replit](https://blog.replit.com/internship-experience-at-replit) as well as creating
an [introduction to Code Search](https://introducing-code-search.util.repl.co/).

## How Does One Search

The first question we needed to ask is how to actually perform a search on a Repl. We knew we didn't want to compromise on
performance, feedback should be as immediate as possible so you can maintain your flow while developing. We also knew that
there were some great projects. To meet these needs, we reached for [ripgrep](https://github.com/BurntSushi/ripgrep).

In order to run our search, we need to work with the Repl container service to run `rg` with the appropriate arguments
for our search and then send the result back to the client. We use [crosis](https://github.com/replit/crosis) to make
this happen:

```typescript
async function search(query) {
	const { output, error } = await container.exec("rg", "--", query);

	if (error) {
		return {
			error,
			results: null,
		};
	}

	return {
		error: null,
		// Turn the raw output lines into some structured data so we can display it in the search results.
		results: parseRgOutput(output),
	};
}
```

## Stream Me Baby One More Time

Waiting for the whole search to finish before retrieving results is slow. Instead, we can take advantage of crosis's ability to
stream the output back to us in chunks that we can parse and display on the fly. It may seem small, but from this simple change
we get an average 40% faster in showing search results. This first response also often contains more than enough results to fill
the visible search area, making Code Search feel significantly more responsive.

However, while streaming results back gives us a boost for initial responsiveness, two problems arise: rendering performance and
truncating results. In order to keep the web view performant we need to limit the number of results we process. This goes for
both the results rendered to the page as well as the ones held in memory. To avoid bringing your IDE to a crawl, we employ a few
techniques:

1. List Virtualization

To avoid rendering thousands of new elements to the page for every search, we make use of [`@tanstack/react-virtual`](https://github.com/TanStack/virtual).
By estimating heights of the would-be DOM nodes and tracking the scroll position in our search results, we can intelligently add
and remove DOM nodes as needed when they would become visible. Now instead of rendering every single search result at the same
time, only the ones in the visible area are created!

2. Output Limits

Some search queries like "[a](https://www.youtube.com/shorts/GDHbHhIgiFk)" can result in _many_ matches and we both know you weren't going
to look through all 300MB of search results, right? Instead, we give `rg` a hard cut-off of 32kb. We found that is plenty to give
quite a few results to search through while still being small enough to ensure even a few instances of Code Search open at the
same time won't be an issue. Since we're streaming the result back, we now have to be more defensive in our parsing of the search
results output since arbitrarily cutting the output off like this can yield a malformed line.

With these changes, we saw a pretty big leap in initial responsiveness:

| Repl Boost | Initial Response (Avg.) | Initial Streaming Response (Avg.) |
| ---------- | ----------------------- | --------------------------------- |
| 0x         | 338.3ms                 | 137.7ms                           |
| 8x         | 316.0ms                 | 129.1ms                           |
| 32x        | 230.7ms                 | 98.7ms                            |

## 10x Code Searcher

With the search system itself performing well, we started rallying around the UI and UX to get the tool polished for developers to
start using! We worked to make our in-editor search consistent with the new Code Search tool's visual style and shifted towards making
Code Search more powerful than what you may be used to. The brand new Code Search tool comes with some extremely useful features:

- Multiple Panes

That's right, you can have multiple searches open at the same time! They stay separate so you can maintain your context when you're
working instead of having to retype the same set of queries over and over.

![Multiple Code Search Panes](https://blog.replit.com/images/the-journey-to-code-search/multiple-panes.png)

- History

Retype your queries? What is this, 1970? Hit the Up and Down arrows when you're focused on the search field to go to the previous or
next query you entered!

![Query history example](https://blog.replit.com/images/the-journey-to-code-search/query-history.gif)

- Include / Exclude

Filter search results to only be from a certain directory, matching a certain file type, or anything else you can do with a glob. You
can also filter search results to remove certain patterns. In fact, you can use both of these together!

![Filters example](https://blog.replit.com/images/the-journey-to-code-search/filters.gif)

- Regular Expressions

Regular Expression search is helpful when the results you want are all slightly different. This feature really shines when performing a
replace, using capture groups. Super charge your next big code refactor!

![Regular expression example](https://blog.replit.com/images/the-journey-to-code-search/regex-replace.gif)

- Keyboard Navigation

Who needs a mouse when you can navigate search results with Tab, Up, Down, Left, and Right to jump between files, lines, and matches.
Give it a try and see how quickly you toss that old pointing device in the bin!

![Keyboard navigation example](https://blog.replit.com/images/the-journey-to-code-search/keyboard-navigation.gif)

## Mount Code Search

While it may seem like we've reached the peak, there are still a lot of awesome features and support we want to build around Code Search. We'll be
working on making Code Search even better and you're welcome to [join us](https://replit.com/site/careers)! If you like solving problems and building great tools for
developers then drop us a line. Or if you have any ideas that would make Code Search even better [let us know](https://ask.replit.com)!
