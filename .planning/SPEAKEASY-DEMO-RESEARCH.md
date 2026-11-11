# SpeakEasy Demo Video: Free and Student Options

2026-11-11. Research only. Goal: a real demo of SpeakEasy for the portfolio card (and
optionally a longer walkthrough for Devpost / YouTube), at $0 or on student credits.

## The constraint that decides everything

SpeakEasy's value is a **live** talking-video call. The repo's own rules (docs/11 and
`docs/tasks/DEMO-01-submission-prep.md`) say: record a real session with fictional content,
label prerecorded material, and **never present a mock or scripted clip as live inference**.
So the demo has to be a screen recording of a real call. AI should only polish it (edit,
captions, layout, motion). It shouldn't generate it: no avatar presenter and no generated
"call" footage. A faked call would undercut the thing the project won prizes for.

The repo already has a timed 2-minute shot script (`DEMO-01`, "Two-minute demo video"):
lobby → briefing with goal and hard-moment line → Show me first → **Call Jordan** (wait for
video, interrupt once) → recap → "Try that moment once" → stack line. Use it as-is.

## Recommended pipeline ($0)

| Step | Tool | Cost | Why |
|---|---|---|---|
| 1. Record | **Cap** (cap.so), Studio mode | Free for personal use | Records the screen plus **system audio and mic** on a Mac, which is needed to capture Jordan's voice. No watermark or time limit in Studio mode (per Cap's site). |
| 1 (alt) | Chrome tab capture with "Share audio", or OBS | Free | Fallbacks if Cap misbehaves. OBS has no auto-zoom. |
| 2. Portfolio cut (20–30s) | **Hyperframes `/brag`**, the same tool that made the other 6 portfolio videos | Free, local | Composites the *real* call footage with the title, callouts and outro, so it matches the other cards. I can do this step. |
| 3. Loop clip | ffmpeg | Free | 5–8s silent loop of the live call for the Home row, plus a poster. Same as the other loops. |
| 4 (optional). 2-minute narrated walkthrough | **Descript** free plan, or **CapCut** for captions | Free (Descript free: about 1 hr transcription/month, 720p export) | Text-based editing and filler-word removal for a Devpost/YouTube version. |

**Voice:** narrate it yourself. It's your product and your judging pitch, and a human
narrator avoids any "is this AI" doubt in a video about AI conversation.

## Credits and student offers

| Offer | What you get | Relevant because |
|---|---|---|
| **Tavus free plan** | 25 min/month of conversational video, and (since Oct 2026, per a pricing tracker) a 5-minute cap per conversation on Free | **This is the real budget.** Each take of the script uses about 1.5–3 min of Tavus. Check which plan SpeakEasy's Tavus key is on and how many minutes are left before recording. Plan for 2–3 takes in one sitting (about 6–9 min). |
| **ElevenLabs for Students** | 3 months free of ElevenCreative, ElevenAgents and the API, plus a year of ElevenReader Ultra. Needs a .edu account (umich.edu qualifies; US students 18+). | Covers the ElevenLabs side of SpeakEasy calls during recording, and optional voiceover. Claim at elevenlabs.io/students. |
| **ElevenLabs Startup Grants** | 33M credits (about 680 hrs of conversational AI) over 12 months, for teams under 25 people | Only if SpeakEasy keeps going as a project. Review reportedly takes weeks. |
| **MHacks "Best Project Built with ElevenLabs" prize** | Unknown | Check the prize email or Devpost. Sponsor prizes often include credits. |
| **Screen Studio** (Mac) | 40% student discount (about $5.40/mo, per deal sites) | Only if you want its automatic zoom and cursor smoothing. Not needed with the Hyperframes step. |
| **Descript Education plan** | Hobbyist features at a reduced price (apply with a school email) | Only for heavy editing of the long version. The free plan is enough for one video. |
| **GitHub Student Developer Pack** | No video tools found in the 2026 pack | Not useful here. |

## Recording checklist (from DEMO-01, plus what video needs)

- [ ] Check Tavus minutes left on SpeakEasy's account. Run `scripts/demo/seed.mjs --checkin` to reset the demo account.
- [ ] Headphones on, so your mic doesn't pick up Jordan's voice twice.
- [ ] Browser window wider than 700px, zoom at 100%, bookmarks bar hidden, no email address in view.
- [ ] Cap: Studio mode, system audio **and** mic on, record that window only.
- [ ] Follow the DEMO-01 two-minute table. Do 2–3 takes back to back.
- [ ] If a call fails, end it. Don't splice footage from different calls into one "call".
- [ ] Hand me the best `.mov`/`.mp4`. I'll make the 20–30s portfolio video, the loop and the poster, then remove the "work in progress" panel.

## Sources
- Cap: [Mac recording with system audio](https://cap.so/mac-screen-recording-with-audio), [Chrome extension](https://chromewebstore.google.com/detail/fefjaffcodfiogbbngmjkcjpbpclbdcp)
- [Screen Studio alternatives (DEV)](https://dev.to/federicoterzi/top-5-screen-studio-alternatives-2026-1el3), [OpenScreen](https://awesome.ecosyste.ms/projects/github.com%2Fsiddharthvaddem%2Fopenscreen)
- [Free Mac recorders with system audio](https://blog.buildbetter.ai/best-free-screen-recorder-with-system-audio-on-mac/)
- [Descript education plan (official)](https://help.descript.com/hc/en-us/articles/360042210552)
- [Screen recorder education discounts (Tella)](https://www.tella.com/blog/screen-recorder-education-discounts)
- [Tavus pricing (official)](https://tavus.io/pricing), [Tavus conversation caps, Oct 2026](https://www.usagepricing.com/blueprint/activity/tavus-2026-10-24-conversation-duration-caps)
- [ElevenLabs for Students (official blog)](https://elevenlabs.io/blog/introducing-elevenlabs-for-students), [ElevenLabs Startup Grants (official)](https://elevenlabs.io/blog/elevenlabs-startup-grants-just-got-bigger-now-12-months-and-over-680-hours-of-conversational-ai-audio)
- [GitHub Student Pack 2026 overview](https://www.buildmvpfast.com/blog/student-developer-perks-free-ai-tools-copilot-cursor-2026)
