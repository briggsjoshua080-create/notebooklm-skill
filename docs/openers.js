/*
 * OPENER BANK
 * -----------
 * Each opener is a mission you can be dared to do.
 *
 *   text       : the line / action you actually do in the real world
 *   category   : "attractive"  -> approaching someone you find attractive
 *                "stranger"    -> opening a conversation with anyone
 *   difficulty : 1 Warm-up | 2 Medium | 3 Hard | 4 Elite
 *   tip        : a short coaching note on WHY it works / how to deliver it
 *
 * Difficulty drives XP:  1 -> 10xp, 2 -> 25xp, 3 -> 50xp, 4 -> 100xp
 *
 * Lines are written to be natural, situational and genuine — not cheesy
 * pickup lines. Grounded in real social-skills coaching: be specific,
 * comment on the shared environment, give non-physical compliments, and
 * keep it short so it's easy to start.
 */

window.OPENERS = [
  /* =====================================================================
   * DIFFICULTY 1 — WARM-UP  (10 XP)
   * Low stakes. Logistical / situational. Works on literally anyone.
   * Goal: get your voice moving and break the ice with zero pressure.
   * ===================================================================== */
  { text: "Ask a stranger for the time, then add: \"Thanks — I've been losing track of mine all day.\"", category: "stranger", difficulty: 1, tip: "A throwaway follow-up line turns a request into a micro-conversation. The goal is just to keep talking for one extra beat." },
  { text: "Ask someone nearby if they know a good coffee spot around here.", category: "stranger", difficulty: 1, tip: "People love giving local recommendations. It's a gift you're asking for, so it almost never gets a cold response." },
  { text: "Compliment a stranger's bag, jacket, or shoes — be specific about what you like.", category: "stranger", difficulty: 1, tip: "Specific beats generic. 'Great boots' lands harder than 'you look nice.' Then let them respond." },
  { text: "Ask the person next to you in line, \"Is it always this busy here?\"", category: "stranger", difficulty: 1, tip: "Shared-situation openers feel natural because you're both living the same moment right now." },
  { text: "Ask someone for a quick recommendation off the menu where you are.", category: "stranger", difficulty: 1, tip: "Asking for help lowers your status slightly in a good way — it's warm and disarming." },
  { text: "Tell a stranger you like their energy and ask what's got them in a good mood.", category: "stranger", difficulty: 1, tip: "Complimenting energy (not looks) is safe, personal, and invites them to open up." },
  { text: "Ask someone walking a dog, \"What's their name?\" then ask the breed.", category: "stranger", difficulty: 1, tip: "Dogs are the easiest social bridge there is. The owner is already proud — let them talk." },
  { text: "Ask a stranger, \"Quick — do you know if this place takes card or cash only?\"", category: "stranger", difficulty: 1, tip: "Logistical questions are pressure-free reps. The 'quick' signals you respect their time." },
  { text: "Say \"Excuse me, you look like you'd know — where's the nearest [bathroom / exit / station]?\"", category: "stranger", difficulty: 1, tip: "'You look like you'd know' is a tiny bit of warmth that makes a plain question feel friendly." },
  { text: "Comment on the weather to someone waiting near you, then ask if they've got plans for it.", category: "stranger", difficulty: 1, tip: "Weather is a cliché for a reason — it works as a launchpad. The real opener is the follow-up question." },
  { text: "Ask a barista or shop worker how their day is going — and actually listen.", category: "stranger", difficulty: 1, tip: "Service staff are a safe place to practice warmth. Real eye contact and a follow-up makes you memorable." },
  { text: "Tell someone reading a book, \"Is that any good? I've been looking for something new.\"", category: "stranger", difficulty: 1, tip: "You're commenting on what they're already into. Curiosity about their world is magnetic." },
  { text: "Ask a stranger to recommend their go-to order at the place you're both in.", category: "stranger", difficulty: 1, tip: "Low-stakes and useful. You may even get a tip — and a conversation." },
  { text: "Say to someone, \"This song is great — do you know who it is?\"", category: "stranger", difficulty: 1, tip: "Shared sensory experience (the music) gives you an instant, honest reason to speak." },
  { text: "Ask someone near you, \"Have you been here before? I'm trying to figure out if it's worth it.\"", category: "stranger", difficulty: 1, tip: "You're positioning them as the expert. People warm up fast when they get to help." },
  { text: "Hold a door, make eye contact, smile, and say \"There you go.\"", category: "stranger", difficulty: 1, tip: "Not even a full conversation — just a warm, confident micro-interaction to build the habit of engaging." },
  { text: "Ask a stranger if they can recommend a good place to eat nearby.", category: "stranger", difficulty: 1, tip: "Food recommendations are universal. Everyone has an opinion they enjoy sharing." },
  { text: "Tell someone, \"I love your style,\" and leave it at that if you want — or ask where it's from.", category: "attractive", difficulty: 1, tip: "A non-physical compliment about taste/style reads as confident and respectful, not creepy." },
  { text: "Make a light observation out loud to someone near you about whatever you're both watching.", category: "stranger", difficulty: 1, tip: "Thinking out loud to a nearby person is the most natural opener of all — no 'approach' required." },
  { text: "Ask someone for directions even if you half-know the way.", category: "stranger", difficulty: 1, tip: "A pure warm-up rep. The point is reps, not the information." },
  { text: "Ask the person beside you, \"What are you getting? I can never decide here.\"", category: "attractive", difficulty: 1, tip: "Shared indecision is relatable and gives an easy, playful in." },
  { text: "Tell a stranger their plant / coffee / sticker / pin is cool and ask the story behind it.", category: "stranger", difficulty: 1, tip: "Objects people choose to carry are invitations to ask. Everything has a story." },
  { text: "Say to someone, \"Random question — what's the wifi situation like here?\"", category: "stranger", difficulty: 1, tip: "Prefacing with 'random question' gives you permission to talk to anyone." },
  { text: "Comment to a stranger on how long the line is with a smile: \"We picked a great time, huh?\"", category: "stranger", difficulty: 1, tip: "Shared mild misery (a long line) bonds people instantly. Keep it light." },
  { text: "Ask someone what part of town they'd recommend for a night out.", category: "stranger", difficulty: 1, tip: "Open recommendation questions can branch in any direction — easy to keep going." },
  { text: "Tell a stranger you like their tattoo and ask what it means to them.", category: "stranger", difficulty: 1, tip: "Tattoos are chosen and meaningful — asking shows genuine interest in the person." },
  { text: "Ask the person near you, \"Do you actually like this place or is it overrated?\"", category: "stranger", difficulty: 1, tip: "A tiny bit of playful opinion-sharing makes it more fun than a plain question." },
  { text: "Smile and say to someone, \"You look like you're having a better day than me — what's the secret?\"", category: "stranger", difficulty: 1, tip: "Playful, self-deprecating, and it hands them an easy, flattering question to answer." },
  { text: "Ask a stranger if they'd grab a quick photo of you (or offer to take theirs).", category: "stranger", difficulty: 1, tip: "A task-based interaction with a built-in reason to chat afterward: 'Where are you visiting from?'" },
  { text: "Tell someone their laugh / smile is contagious.", category: "attractive", difficulty: 1, tip: "Complimenting an expression rather than a feature is warm and lands as genuine." },

  /* =====================================================================
   * DIFFICULTY 2 — MEDIUM  (25 XP)
   * Light banter, genuine compliments, a real conversation thread.
   * Goal: hold a 30–60 second exchange, not just a single line.
   * ===================================================================== */
  { text: "Open with: \"Okay, I have to ask — where did you get that [item]? I've been looking for one.\"", category: "stranger", difficulty: 2, tip: "Genuine enthusiasm gives them a reason to talk and a reason to like you for noticing." },
  { text: "Tell someone, \"You've got really good taste — you seem like someone who's into [music/art/design].\"", category: "attractive", difficulty: 2, tip: "A specific guess invites them to correct or confirm you. Either way the conversation is rolling." },
  { text: "Say: \"I'm trying to be more spontaneous this year, so — hi. I'm [name].\"", category: "attractive", difficulty: 2, tip: "Naming your own slight nervousness as a goal is honest and charming. It disarms both of you." },
  { text: "Walk up and say, \"This might be random, but you seem really easy to talk to, so I wanted to say hi.\"", category: "attractive", difficulty: 2, tip: "Acknowledging it's a little random is honest. People respect the courage and warmth." },
  { text: "Make a playful observation: \"You've been staring at that menu like it personally wronged you.\"", category: "attractive", difficulty: 2, tip: "Light teasing about a shared moment creates instant playfulness — keep it gentle and smile." },
  { text: "Ask someone, \"What's the best thing that's happened to you today?\"", category: "stranger", difficulty: 2, tip: "An unusual, positive question stands out and steers the talk somewhere genuine fast." },
  { text: "Tell a stranger, \"You look like you have a good story — what brought you here today?\"", category: "stranger", difficulty: 2, tip: "Framing them as interesting makes them want to live up to it. Curiosity is a compliment." },
  { text: "Say: \"I noticed you from over there and figured I'd regret it if I didn't come say hi.\"", category: "attractive", difficulty: 2, tip: "Honesty about your intention is rare and attractive. Say it calm, relaxed, then introduce yourself." },
  { text: "Comment on their book/laptop sticker/team gear: \"No way, you're into that too?\"", category: "attractive", difficulty: 2, tip: "Shared-interest openers have built-in momentum. Lead with surprise and enthusiasm." },
  { text: "Ask, \"If you could be anywhere but here right now, where would you be?\"", category: "stranger", difficulty: 2, tip: "A daydream question is fun, low-pressure, and reveals personality quickly." },
  { text: "Tell someone, \"You have great style — do you work in something creative?\"", category: "attractive", difficulty: 2, tip: "A compliment plus an open guess about their life keeps the door wide open for them to talk." },
  { text: "Open with, \"Settle a debate for me — [light fun question]. I need a tiebreaker.\"", category: "stranger", difficulty: 2, tip: "An 'opinion opener' invites participation. People love being asked to weigh in." },
  { text: "Say, \"You seem like you'd give an honest answer — is this place worth the hype?\"", category: "attractive", difficulty: 2, tip: "A small compliment ('honest') wrapped around a question is smooth and natural." },
  { text: "Tell a stranger, \"I'll be honest, I'm forcing myself to talk to more people — you looked friendly.\"", category: "stranger", difficulty: 2, tip: "Radical honesty is a superpower. Most people find the vulnerability refreshing, not weak." },
  { text: "Ask, \"What's something you're weirdly passionate about that no one expects?\"", category: "stranger", difficulty: 2, tip: "An off-beat question gives them permission to be interesting and skips the boring small talk." },
  { text: "Make eye contact across the room, smile, walk over and say, \"I had to come introduce myself.\"", category: "attractive", difficulty: 2, tip: "The earlier eye contact 'pre-opens' the interaction. Walking over confidently does most of the work." },
  { text: "Say, \"You've got a great vibe — are you always this relaxed or is today special?\"", category: "attractive", difficulty: 2, tip: "Complimenting their vibe and adding a playful question keeps it from being a dead-end line." },
  { text: "Ask, \"Quick gut check: is [the event/place] living up to expectations for you?\"", category: "stranger", difficulty: 2, tip: "Shared-experience opinion questions are easy yeses and lead naturally to 'what brought you here?'" },
  { text: "Tell someone, \"I don't usually do this, but you caught my eye and I wanted to meet you.\"", category: "attractive", difficulty: 2, tip: "Simple, direct, sincere. Delivered calmly, this honesty is far more powerful than any clever line." },
  { text: "Comment, \"You two are clearly the fun group here — what's the occasion?\"", category: "stranger", difficulty: 2, tip: "Approaching a small group with a warm observation is easier than a one-on-one for many people." },
  { text: "Say, \"I'm going to guess you're a [coffee/tea] person... and that you're not from around here.\"", category: "attractive", difficulty: 2, tip: "Playful cold-reading is fun. Being slightly wrong is even better — it sparks a back-and-forth." },
  { text: "Ask, \"What's the most spontaneous thing you've done recently?\"", category: "attractive", difficulty: 2, tip: "It implies a fun, adventurous frame and gets them sharing a story they enjoy telling." },
  { text: "Tell a stranger, \"I love how into [activity] you are — how'd you get started with it?\"", category: "stranger", difficulty: 2, tip: "Asking about origins gets people talking about their journey, which they rarely get to share." },
  { text: "Open with, \"You look like you have strong opinions about [topic]. Am I right?\"", category: "attractive", difficulty: 2, tip: "Playfully accusing them of having opinions is charming and gets an instant reaction." },
  { text: "Say, \"Real talk — what's your honest review of this [coffee/food/event]?\"", category: "stranger", difficulty: 2, tip: "'Real talk' invites candor and a bit of playful conspiracy between the two of you." },
  { text: "Tell someone, \"You seem like the most interesting person in this room and I had to find out if I'm right.\"", category: "attractive", difficulty: 2, tip: "Bold but warm. It's a compliment and a challenge — they'll want to prove you right." },
  { text: "Ask, \"If I had to try one thing here for the first time, what should it be?\"", category: "stranger", difficulty: 2, tip: "Makes them your guide and gives a natural reason to keep chatting about their pick." },
  { text: "Say, \"I'm new to the area — what's something a local would know that I wouldn't?\"", category: "stranger", difficulty: 2, tip: "The 'insider knowledge' frame is flattering and opens a long, easy thread of conversation." },
  { text: "Comment, \"You've got the best laugh in here — I could hear it from across the room.\"", category: "attractive", difficulty: 2, tip: "Specific, sensory, non-physical compliment. It feels observed and genuine, not rehearsed." },
  { text: "Ask, \"What's been the highlight of your week so far?\"", category: "stranger", difficulty: 2, tip: "Positive and personal without being heavy — an easy on-ramp to a real exchange." },

  /* =====================================================================
   * DIFFICULTY 3 — HARD  (50 XP)
   * Direct approach. State interest, hold the conversation, get a name,
   * and aim toward exchanging contact info.
   * ===================================================================== */
  { text: "Walk up directly: \"Hi — this is a little forward, but I think you're really attractive and I wanted to meet you. I'm [name].\"", category: "attractive", difficulty: 3, tip: "The gold-standard direct opener. Calm tone, relaxed body language, then introduce yourself and let it breathe." },
  { text: "Approach and say, \"I saw you and thought you seemed really cool, so I wanted to come say hi before you left.\"", category: "attractive", difficulty: 3, tip: "Naming the time pressure ('before you left') justifies the approach and shows decisiveness." },
  { text: "After a short chat, say: \"I've really enjoyed talking to you — can I get your number so we can continue this?\"", category: "attractive", difficulty: 3, tip: "Ask for the number once there's a thread of rapport. Frame it as continuing something good, not starting cold." },
  { text: "Tell someone, \"You seem genuinely interesting and I'd love to keep talking — are you free for a coffee sometime this week?\"", category: "attractive", difficulty: 3, tip: "Specific and low-pressure ('coffee', 'this week'). A clear ask is more attractive than hinting." },
  { text: "Open a group: \"Hey, I don't know any of you, but you looked like the most fun table here so I came over.\"", category: "stranger", difficulty: 3, tip: "Approaching a group directly takes nerve. Warmth plus honesty disarms the whole group at once." },
  { text: "Say, \"I have about two minutes before I have to go, but I'd have kicked myself if I didn't come talk to you.\"", category: "attractive", difficulty: 3, tip: "A built-in time limit lowers the stakes for both of you and creates a memorable, decisive impression." },
  { text: "Approach and be honest: \"I'm working on being braver about meeting people, and you were the person I most wanted to talk to here.\"", category: "attractive", difficulty: 3, tip: "Vulnerability delivered with a smile reads as confidence, not weakness. It's disarmingly honest." },
  { text: "Tell them, \"You have a great presence. What's your name? I'm [name].\"", category: "attractive", difficulty: 3, tip: "Lead with a genuine compliment about presence, then immediately exchange names to anchor the interaction." },
  { text: "After chatting, say: \"I have to run, but I'd really like to see you again — let's swap numbers.\"", category: "attractive", difficulty: 3, tip: "Assume the close. A relaxed 'let's swap numbers' is easier to say yes to than a nervous 'can I maybe...'" },
  { text: "Walk over and say, \"You caught my attention the moment you walked in. I'm [name] — and you are?\"", category: "attractive", difficulty: 3, tip: "Direct and grounded. The follow-up question hands them the floor and keeps it from feeling like a one-liner." },
  { text: "Say to someone at an event, \"I came to meet new people and you seem like exactly who I should be talking to.\"", category: "stranger", difficulty: 3, tip: "States your intention plainly. Confidence is in the clarity, not in being clever." },
  { text: "Approach and say, \"I'll regret it if I don't ask — would you want to grab a drink sometime?\"", category: "attractive", difficulty: 3, tip: "Skip the hinting. A direct, warm invitation respects both your time and theirs." },
  { text: "Tell them, \"You seem like someone I'd get along with — I'd love to take you out properly. What's your number?\"", category: "attractive", difficulty: 3, tip: "Clear intent ('take you out'). Decisiveness is attractive; ambiguity kills momentum." },
  { text: "Open with, \"I noticed you from across the room and decided being shy wasn't going to work today. I'm [name].\"", category: "attractive", difficulty: 3, tip: "Narrating your decision to be bold is charming and humanizes the approach." },
  { text: "Say, \"This is the part where I admit I walked over here with no plan — but you seemed worth it.\"", category: "attractive", difficulty: 3, tip: "Playful honesty about having no script is relatable and instantly likeable." },
  { text: "After a good chat, say, \"I don't want this to be a one-time thing — give me your number and let's do this again.\"", category: "attractive", difficulty: 3, tip: "Frames a future together as the obvious next step. Warm certainty beats hesitant asking." },
  { text: "Approach someone reading/working and say, \"I'm sorry to interrupt — I just genuinely wanted to meet you. Two minutes?\"", category: "attractive", difficulty: 3, tip: "Acknowledging the interruption is polite; the 'two minutes' makes it easy to say yes to." },
  { text: "Tell someone, \"You've got the kind of smile that's hard to walk past, so I didn't.\"", category: "attractive", difficulty: 3, tip: "A bold, sincere compliment delivered calmly. Then pause — let them respond before you say more." },
  { text: "Say, \"I'm going to be honest, I find you really attractive and I'd love to know if you're single.\"", category: "attractive", difficulty: 3, tip: "High-clarity and high-courage. Said relaxed and with a smile, directness is magnetic." },
  { text: "Approach and say, \"I had a whole plan and forgot all of it when you looked over. I'm [name].\"", category: "attractive", difficulty: 3, tip: "Self-aware humor about your own nerves is endearing and breaks tension immediately." },
  { text: "Tell a stranger you admire, \"What you just did/said was really cool — I wanted to tell you in person.\"", category: "stranger", difficulty: 3, tip: "Going out of your way to give sincere recognition is rare and creates an instant connection." },
  { text: "Say, \"I'm not great at this, but I'd rather try and be awkward than walk away wondering. Can I buy you a coffee?\"", category: "attractive", difficulty: 3, tip: "Owning the awkwardness removes its power. The honest invitation does the rest." },
  { text: "Open with, \"You and I are going to be friends — or at least I'm hoping. I'm [name].\"", category: "attractive", difficulty: 3, tip: "Playful presumption with a smile is fun and confident. Keep it light and warm." },
  { text: "After chatting, say, \"Before you go — I'd love to continue this. What's the best way to reach you?\"", category: "attractive", difficulty: 3, tip: "'Best way to reach you' assumes the contact exchange smoothly, without a clunky 'can I have your number.'" },
  { text: "Approach and say, \"I saw you laughing with your friends and thought, that's someone I want to know.\"", category: "attractive", difficulty: 3, tip: "Referencing a real moment you observed makes the compliment specific and believable." },

  /* =====================================================================
   * DIFFICULTY 4 — ELITE  (100 XP)
   * Maximum courage. Bold direct approaches, asking out on the spot,
   * approaching in intimidating contexts. These are the big swings.
   * ===================================================================== */
  { text: "Approach the most attractive person in the room within 60 seconds of deciding to, and introduce yourself.", category: "attractive", difficulty: 4, tip: "The 3-second rule, maxed out. Acting before fear takes hold is the entire skill. Momentum beats perfection." },
  { text: "Say, \"I think you're stunning, and I'd love to take you on a date this week. Can I get your number?\"", category: "attractive", difficulty: 4, tip: "Full clarity: compliment, clear intent, specific ask, all in one breath. The boldest, cleanest move there is." },
  { text: "Approach someone you find attractive while they're with friends and confidently introduce yourself to all of them first.", category: "attractive", difficulty: 4, tip: "Winning over the group makes the one-on-one easy. Be warm to everyone; the friends become your allies." },
  { text: "Tell someone, \"I would genuinely regret it forever if I didn't ask you out right now. Would you let me take you to dinner?\"", category: "attractive", difficulty: 4, tip: "Naming the regret raises the stakes honestly. A specific, sincere ask in person is incredibly rare and memorable." },
  { text: "Approach a stranger and ask them to join you for a coffee right now, on the spot.", category: "attractive", difficulty: 4, tip: "An immediate invitation is the ultimate test of decisiveness. Most won't — but the rep itself is the win." },
  { text: "Walk up to someone and give a bold, sincere compliment with full eye contact, then hold the silence and let them respond.", category: "attractive", difficulty: 4, tip: "Holding the pause after a bold compliment takes serious nerve — and signals total composure." },
  { text: "Approach in a high-pressure setting (gym, busy street, packed bar) and start a genuine conversation anyway.", category: "attractive", difficulty: 4, tip: "Hard contexts build the most resilience. If you can open here, the easy settings feel effortless afterward." },
  { text: "Tell someone, \"Out of everyone here, you're the one I had to meet. I'm [name] — tell me something real about you.\"", category: "attractive", difficulty: 4, tip: "Bold framing plus a request for depth skips small talk entirely and creates an intense, memorable moment." },
  { text: "Re-approach someone you talked to earlier and say, \"I left and immediately wished I'd asked for your number. So — can I?\"", category: "attractive", difficulty: 4, tip: "The re-approach takes huge courage and reads as decisive and sincere. The honesty is irresistible." },
  { text: "Ask someone you just met, \"What are you doing right now? Because I'd love to keep talking — let's go grab something.\"", category: "attractive", difficulty: 4, tip: "Turning a cold open into an instant 'date' is the highest-level move. Relaxed confidence is everything." },
  { text: "Approach and say, \"I find you incredibly attractive, and I think you'd regret not getting to know me too. Coffee?\"", category: "attractive", difficulty: 4, tip: "Bold, playful, and self-assured. The confident humor makes the directness land as charming, not arrogant." },
  { text: "Strike up a real conversation with someone, get their name, find one genuine thing in common, and ask them out — all in one interaction.", category: "attractive", difficulty: 4, tip: "The complete sequence in a single approach. This is the whole game compressed — and the biggest XP swing." },
  { text: "Approach two days in a row in the same place, even after a rejection the first time.", category: "attractive", difficulty: 4, tip: "Resilience is the rarest trait. Showing up again, unbothered, is the real mark of someone who's mastered this." },
  { text: "Give a heartfelt, specific compliment to someone clearly out of your comfort zone, with zero agenda.", category: "stranger", difficulty: 4, tip: "Doing it with no goal but to brighten their day rewires your fear of approaching into a habit of giving." },
  { text: "Approach, introduce yourself, and within the conversation say, \"Can I be honest? I'd really like to see you again.\"", category: "attractive", difficulty: 4, tip: "Stating real interest out loud, in person, is the boldest honesty there is. It cuts through every game." },

  /* =====================================================================
   * BATCH 2 — more variety so you rarely repeat a line
   * ===================================================================== */

  /* ---- D1 Warm-up (10 XP) ---- */
  { text: "Ask someone where they got their drink — \"That looks better than mine.\"", category: "stranger", difficulty: 1, tip: "A light, specific observation about the shared moment. Easy to say, easy for them to answer." },
  { text: "Tell a cashier or waiter, \"You're really good at this,\" and mean it.", category: "stranger", difficulty: 1, tip: "Unexpected praise for someone doing their job lands warmly and builds your habit of speaking up." },
  { text: "Ask the person next to you, \"Is this seat taken?\" even if it's obvious, then add a friendly comment.", category: "stranger", difficulty: 1, tip: "A built-in reason to speak, with a follow-up to keep it from ending instantly." },
  { text: "Comment to someone, \"You clearly know what you're doing — any tips for a first-timer?\"", category: "stranger", difficulty: 1, tip: "Positioning them as the expert is the most reliable warm-up there is." },
  { text: "Say to a stranger, \"Honestly, I just needed to say that out loud to someone — what do you think?\" after an observation.", category: "stranger", difficulty: 1, tip: "Thinking out loud is the most natural opener; the question pulls them in." },
  { text: "Ask someone if they know how late this place stays open.", category: "stranger", difficulty: 1, tip: "Pure logistics rep — zero stakes, just practice using your voice with a stranger." },
  { text: "Tell someone their accessory (watch, ring, hat) is great and ask if there's a story to it.", category: "stranger", difficulty: 1, tip: "Chosen accessories are invitations. People love explaining the meaningful ones." },
  { text: "Ask a stranger which way they're headed and whether the route's any good.", category: "stranger", difficulty: 1, tip: "Low-key and practical, with an easy thread to follow if they're chatty." },
  { text: "Say to someone, \"You look like you come here a lot — what should I not miss?\"", category: "stranger", difficulty: 1, tip: "A friendly assumption plus an open question makes them your guide." },
  { text: "Compliment someone's choice — \"Good pick, I almost got that too.\"", category: "attractive", difficulty: 1, tip: "Tiny shared-taste moment. It signals you noticed them without any pressure." },
  { text: "Ask a stranger to settle something small: \"Window open or closed — what's the vote?\"", category: "stranger", difficulty: 1, tip: "Playful micro-poll. Shared decisions create instant, frictionless contact." },
  { text: "Tell someone, \"That color looks great on you,\" and keep walking if you want.", category: "attractive", difficulty: 1, tip: "A drive-by compliment with no agenda builds boldness and often gets a smile back." },
  { text: "Ask the person beside you, \"First time here too, or are you a regular?\"", category: "attractive", difficulty: 1, tip: "An either/or question is easy to answer and naturally branches into more." },
  { text: "Say, \"Quick — recommend me a song / show / book. I trust your face.\"", category: "stranger", difficulty: 1, tip: "Playful and flattering. The absurd 'I trust your face' makes it memorable and fun." },
  { text: "Comment on a shared frustration nearby (slow wifi, long wait) with a warm, knowing look.", category: "stranger", difficulty: 1, tip: "Shared minor annoyance is the fastest bonding shortcut between strangers." },

  /* ---- D2 Medium (25 XP) ---- */
  { text: "Open with, \"You seem like you have great taste — settle this for me: [A] or [B]?\"", category: "attractive", difficulty: 2, tip: "Compliment plus an opinion question is smooth and gives them an easy way in." },
  { text: "Say, \"I have a theory about people who [do the thing they're doing]. Want to hear it?\"", category: "attractive", difficulty: 2, tip: "Playful intrigue. 'Want to hear it?' makes them lean in and invest." },
  { text: "Tell someone, \"You've got main-character energy — what's your story?\"", category: "attractive", difficulty: 2, tip: "A fun, flattering frame that invites them to be interesting without pressure." },
  { text: "Ask, \"What's something you'd happily talk about for an hour?\"", category: "stranger", difficulty: 2, tip: "It hands them their favorite topic and guarantees an animated, easy conversation." },
  { text: "Say, \"You don't seem like everyone else here — in a good way. What's your deal?\"", category: "attractive", difficulty: 2, tip: "A curious, lightly teasing compliment that stands out from generic small talk." },
  { text: "Open with, \"I'm doing a very unscientific survey — best [coffee / pizza / movie] in this city, go.\"", category: "stranger", difficulty: 2, tip: "The 'survey' frame is fun and low-pressure; everyone has a confident answer." },
  { text: "Tell someone, \"I noticed you have a great laugh and decided you were worth interrupting for.\"", category: "attractive", difficulty: 2, tip: "Specific, sincere, and a touch bold — owning the interruption is confident." },
  { text: "Ask, \"What's the most underrated thing about [the city / this place]?\"", category: "stranger", difficulty: 2, tip: "Invites a thoughtful, positive answer and naturally leads to 'are you from here?'" },
  { text: "Say, \"You look like you're plotting something fun. Am I close?\"", category: "attractive", difficulty: 2, tip: "Playful mind-reading creates instant banter — being wrong is just as good as being right." },
  { text: "Open with, \"Two truths and a lie — go. I'll guess.\" with a stranger who seems game.", category: "stranger", difficulty: 2, tip: "A tiny game collapses small talk instantly and is genuinely fun for both of you." },
  { text: "Tell someone, \"I had to come over — you're clearly the most interesting conversation in the room.\"", category: "attractive", difficulty: 2, tip: "Bold-but-warm framing that's a compliment and an invitation rolled into one." },
  { text: "Ask, \"If money and time didn't matter, what would you actually be doing right now?\"", category: "attractive", difficulty: 2, tip: "A dreamy, revealing question that skips small talk and shows you're curious about them." },
  { text: "Say, \"Be honest — are you as fun as you look, or is it an act?\"", category: "attractive", difficulty: 2, tip: "Cheeky and confident. The mock-challenge invites them to play along." },
  { text: "Open with, \"You seem like someone who's traveled. Where's the best place you've been?\"", category: "stranger", difficulty: 2, tip: "A flattering assumption that unlocks a story people love to tell." },
  { text: "Tell a small group, \"You all look like trouble — what's the plan tonight?\"", category: "stranger", difficulty: 2, tip: "Warm, playful group openers spread the social pressure across everyone." },

  /* ---- D3 Hard (50 XP) ---- */
  { text: "Walk up and say, \"I'd never forgive myself if I didn't come tell you that you're gorgeous. I'm [name].\"", category: "attractive", difficulty: 3, tip: "Bold compliment plus an immediate name exchange anchors it as a real interaction, not a line." },
  { text: "After a chat, say, \"I've genuinely enjoyed this — let's not make it a one-off. Number?\"", category: "attractive", difficulty: 3, tip: "Casual confidence. Treating the contact swap as obvious makes it easy to say yes to." },
  { text: "Approach and say, \"Be honest — is there a boyfriend I'm about to be disappointed about?\"", category: "attractive", difficulty: 3, tip: "Playfully direct; it signals clear intent while keeping things light and fun." },
  { text: "Tell someone, \"You're exactly the kind of person I came here hoping to meet. Can I steal a few minutes?\"", category: "attractive", difficulty: 3, tip: "Honest intent plus a small, easy ask ('a few minutes') lowers the barrier." },
  { text: "Say, \"I'll keep it simple — I think you're great and I'd love to take you for a drink. You in?\"", category: "attractive", difficulty: 3, tip: "Clarity is charisma. A clean, direct invitation beats ten minutes of hinting." },
  { text: "Approach and say, \"I saw you and my brain went 'go talk to her' — so here I am. I'm [name].\"", category: "attractive", difficulty: 3, tip: "Narrating the impulse is honest and charming, and humanizes the whole thing." },
  { text: "After talking, say, \"This was the best part of my day. Let's continue it — what's your number?\"", category: "attractive", difficulty: 3, tip: "A warm, sincere reason to swap contacts, framed as continuing something already good." },
  { text: "Tell someone, \"You have the kind of vibe people remember. I had to introduce myself before I lost the nerve.\"", category: "attractive", difficulty: 3, tip: "A genuine compliment plus a touch of honest vulnerability is magnetic." },
  { text: "Approach a busy person and say, \"I know you're mid-thing — I just had to say hi and I'm hoping you're free later.\"", category: "attractive", difficulty: 3, tip: "Respecting their time while being direct shows confidence and consideration at once." },
  { text: "Say, \"I think we'd get along — and I'd rather find out over coffee than wonder about it. What do you say?\"", category: "attractive", difficulty: 3, tip: "Frames the date as a natural experiment; relaxed certainty makes it inviting." },
  { text: "Re-approach someone and say, \"I walked away and instantly regretted not getting your name. So — I'm [name].\"", category: "attractive", difficulty: 3, tip: "The re-approach reads as decisive and sincere; the honesty does the heavy lifting." },
  { text: "Tell someone, \"You're trouble, I can tell — the good kind. Let's swap numbers before I talk myself out of it.\"", category: "attractive", difficulty: 3, tip: "Playful teasing plus a direct close keeps it fun while still moving things forward." },
  { text: "Approach and say, \"Genuine question — what does it take to take you out sometime?\"", category: "attractive", difficulty: 3, tip: "Confident and disarmingly direct; it assumes the date and invites a real answer." },
  { text: "Say to someone you admire, \"That took guts / talent — I came over specifically to tell you, and to meet you.\"", category: "stranger", difficulty: 3, tip: "Sincere recognition delivered in person creates an instant, genuine connection." },
  { text: "After a good talk, say, \"I'm not going to overthink this — give me your number and let's plan something real.\"", category: "attractive", difficulty: 3, tip: "Decisiveness is the attractive part. 'Something real' signals genuine intent." },

  /* ---- D4 Elite (100 XP) ---- */
  { text: "Approach the person you find most attractive in a crowded place and ask them out within the first two minutes.", category: "attractive", difficulty: 4, tip: "Maximum decisiveness in a high-pressure setting. The speed is the entire skill being trained." },
  { text: "Say, \"I think you're incredible, and I'd be kicking myself tomorrow if I didn't ask for your number right now.\"", category: "attractive", difficulty: 4, tip: "Vulnerability + clarity + a clear ask, all out loud. Few people ever do this — and it's unforgettable." },
  { text: "Approach a group, win them all over, and ask the one you like to step aside for a real conversation.", category: "attractive", difficulty: 4, tip: "Befriend the group, then make your move. The social finesse here is elite-level." },
  { text: "Turn a cold open into an instant mini-date: \"What are you doing right now? Let's go grab a coffee — my treat.\"", category: "attractive", difficulty: 4, tip: "Converting an approach into action on the spot is the highest expression of confidence." },
  { text: "Give a bold, sincere compliment, then hold eye contact and silence for three full seconds before saying more.", category: "attractive", difficulty: 4, tip: "The held pause after a bold line signals total composure — and is genuinely hard to do." },
  { text: "Approach in a setting that scares you most (gym, library, packed train) and have a full, genuine conversation.", category: "attractive", difficulty: 4, tip: "The hardest contexts build the deepest resilience. Clear these and everything else feels easy." },
  { text: "Ask someone you just met, \"Are you free right now? I'd love to actually spend some time with you.\"", category: "attractive", difficulty: 4, tip: "An immediate, sincere invitation. Most won't take it — but offering it is the rep that rewires fear." },
  { text: "Approach someone, get a real conversation going, find common ground, and secure plans for a specific day — all in one go.", category: "attractive", difficulty: 4, tip: "The complete sequence in a single interaction. This is the whole craft compressed into one approach." },
  { text: "After a rejection earlier, approach someone new in the same place within five minutes — unbothered, still warm.", category: "attractive", difficulty: 4, tip: "Bouncing back immediately is the rarest and most valuable trait. Rejection loses its grip on you." },
  { text: "Tell someone, \"I'm going to be totally honest: I find you stunning and I want to take you on a proper date. When are you free?\"", category: "attractive", difficulty: 4, tip: "Compliment, intent, and a scheduling question in one breath — the cleanest, boldest move there is." }
];
