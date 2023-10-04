Regex to grab HTML tags in vscode search: `<([^>]+)>`

- Twitter embeds — These are handled by react-embed
  - 20-million-developers.md
  - aws-simple-guide.md
  - b.md
  - clui.md
  - codingai.md
  - debuggest.md
  - destroying-stuck-repls.md
  - fourth.md
  - gfx.md
  - internet-of-fun.md
  - internship-lily.md
  - mwr-winners.md
  - quality.md
  - solidity.md
  - teams_release.md
  - teams-for-education.md
  - vite.md

- Scripts — These should be implemented in the blog itself
  -  a16z (video playback rate)
  -  ai (video playback on scroll)
  -  llms (video playback on scroll)
  -  mobile-app (video playback on scroll)
  -  threads-v2 (video playback on scroll)

- CTAs — These need to become a component. We should have a generic button block for use in rich text. Each post could also have a dedicated CTA button. Ideally these use the same schema. We know we want to be able to reuse a CTA button in multiple places, we need to be able to either choose a CTA from a list or create a new one. Basically we need a small library of CTAs, but not every button needs to go in there. So we could create a core CTA object schema which is used by the post CTA and can be referenced as a rich text block, we encourage editors to use the core library for consistency, but discourage adding every button to the core library.
  - 100-days-of-code.md
  - ai-panel.md
  - ai.md
  - aicampxreplit.md
  - bounties-altimeter-case-study.md
  - bounties-christian-ulstrup-case-study.md
  - bounties-deel-case-study.md
  - bounties-magic-prints-case-study.md
  - bounties-nat-dev.md
  - bounties-ship-in-your-sleep.md
  - bounties.md
  - camp-lingo.md
  - genuary.md
  - ghostwriter.md
  - gw-chat-launch.md
  - ml-hackathon.md
  - mobile-app.md
  - nodepad.md
  - replit-deployments-magic-school.md
  - replit-reps.md

- Figure/figcaption — we can use a custom field for this and make it handle videos as well
  - data-loss.md
  - debuggest.md
  - geo-parts-2-loadbalancing.md
  - kobra.md
  - native-graphics-love.md
  - python-new-template.md
  - replspace-filesystems.md
  - replacespace-templates.md

```
// figure.js - todo- make this support video
export default {
  name: 'figure',
  type: 'image',
  title: 'Figure',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: `Describe the image for people who can't see it`,
      isHighlighted: true
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      description: `Text that's displayed with the image`,
      isHighlighted: true
    }
  ],
  options: {
    hotspot: true
  }
}
```


- Styles — Can all be integrated into the blog
  - apps.md (video-container)
  - autoscale.md (video-container)
  - bounties.md (video-container)
  - collab.md (video-container)
  - deploy-bun-apps-on-replit.md (video-container)
  - ghostwriter.md (video-container)
  - github.md (video-container)
  - hey-data-profile.md
  - mobile-app.md (video-container)
  - nodepad.md (video-container)
  - solidity.md (video-container)
  - student-offer.md