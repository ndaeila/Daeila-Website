---
date: "2024-12-05"
title: "Emotion Profile: What shape are your emotions?"
image: "/images/blog/04.png"
categories: ["Portfolio", "Analysis", "Data", "Network Visualization"]
draft: false
---

Nathan here. What shape are your emotions? After a school quarter of analyzing dots (from 3 completely unrelated projects), I want to bring attention to my semi-new favorite way to visualize a network of seemingly unrelated data points. 

Recently, I have been encountering a reoccurring need to create visualizations that help me spatially understand the shape and contents of my data... that is, before I know what insights I intend to uncover from the data. 

My problem is, I don't want to make 80 different visualizations from every angle of my data when I want to explore what my data looks like, and I don't have the patience to read and interpret all the rows of my data one-by-one. However, without fully understanding what my data looks like or how it's shaped, I have a hard time finding patterns in my data worth analyzing, or how to best fit predictive models to my data. I loosely understand that there are algorithmic approaches to understanding your data, like using [silhouette scores or dissimilarity/similarity paired with optimization algorithms](https://www.google.com/search?q=measure+how+clustered+your+data+is) to measure how well-defined possible clusters in your data may be, or using SHAP values to figure out how multiple independent features impact a dependent metric within your ML model... But I oftentimes have a hard time figuring out what I want to explore within my data in the first place.

In a perfect world, I would have a quick tool at my fingertips that helps me understand my data with little to no bootstrapping. 

(Disclaimer: There are definitely better exploratory data analysis tools that already exist than the upcoming one I made below, but I wanted to make one that's 3D).

Then I remembered a way to simply use your eyes to see the shape of data. I thought back to an internship I had a while ago, while I was still in the SWE womb trying to comprehend the complexities of basic Git usage. We had access to this amazing tool that allowed us to see how data looks, once the DS team vectorized it for our purposes and probably flattened the dimensions to fit in 3D space. And most importantly, every time I used this tool, I found new insights and eureka moments that led to more questions that I wanted to answer. I knew at that point that I had to recreate the tool, but fix some of the pain points that constrained the tool to only proprietary purposes. 


#### Exploring Exploratory Data Analysis (EDA) in 3D
<img src="/images/blog/EmotionGraph/EmotionProfile.png">



#### The Shape of Emotion: Porting results from pre-trained models using RoBERTa into 
Since a picture is worth 1000 rows, 




#### Dev + Design Process
Believe it or not, creating a 3D Exploratory Data Analysis Tool was as straightforward as creating one in 2D, so naturally I opted to create a 3D tool.

I found a package for React called [React-Force-Graph](https://github.com/vasturiano/react-force-graph) which allows you to position nodes and create edges as you like within 3D space (which looks awesome). The best part is, it's fully customizable because on the backend it's just Three.js, and the amount of detail in the documentation is surreal.

The only caveat - since it is a force graph, forces are applied between the nodes. It's important to set parameter forceEngine="none" and charge={0} to remove meddling, specially if there are links between nodes, because forces from links and other nodes will move nodes out of their respective coordinates (but I recommend leaving the charge parameter alone because its effects are miniscule). After turning the actual forceEngine off, it became exactly what I needed to put my nodes in 3D space. 

Another drawback was the lack of interactivity, so I dressed up the application by adding features like **Settings** and the **Node Information Popup** (when you click a node) to enhance the user's ability to explore the data. Additionally, I wanted node colors to be obvious, so I added a **Color Legend** to

I also added Light and Dark Mode, because I would never dare to forget giving users the option. 









#### Maintaining Commitment to Duolingo

The Duolingo application has mechanisms that work together to convince users to take lessons on a regular (multiple lessons on a daily) basis. Users are inclined to continue their lessons every day, and if they want to keep their league, they need to do an average of multiple lessons a day. Here is a breakdown of the features involved that require commitment from their users:

##### The Streak System: Forgiveness and Goals

<div class="d-flex justify-content-evenly">
  <img src="/images/blog/03-StreakSystem-before.png" style="width: 30%;">
  <img src="/images/blog/03-StreakSystem-middle.png" style="width: 30%;">
  <img src="/images/blog/03-StreakSystem-after.png" style="width: 30%;">
</div>

Streaks are one of the most powerful tools of the decade for fostering loyalty in applications. Many games reward users for maintaining long streaks, and platforms like Snapchat use streaks to symbolize the strength of friendships. The desire to keep a streak going stems from the effort required to build and maintain a sizeable streak. Losing a streak can be discouraging, making it challenging to regain the same level of motivation to start over. Duolingo is well aware of this dynamic and leverages the Streak System to encourage daily engagement from its users. They reward continuous streaks and frequently remind users to maintain their streak, creating significant pressure to keep up the daily habit, visible through persistent notifications and prompts on the home screen. The emphasis on streaks significantly boosts Duolingo's user engagement, creating a sense of daily commitment similar to showcasing long Snapchat streaks among friends. Duolingo has mastered the use of streaks to maintain high levels of user activity, making it a key component of their success in keeping users consistently engaged.

###### Forgiveness: *The Streak Freeze*

However, Duolingo offers a safety net for those who might miss a day: the *Streak Freeze*. This feature, often awarded to users, allows for the preservation of a streak for an additional day if a user fails to complete a lesson. 

There are many names for this strategy. Educators call this a Second Chance strategy and UX designers call this feature a "forgiveness" or "re-engagement" mechanism. This strategy helps prevent the demotivation that comes with losing a long streak, ensuring users feel encouraged to continue their lessons without interruption.

###### Goals: *The Streak Challenge*

Duolingo takes the streak a step further by creating a *Streak Challenge*. Users are challenged to go days without breaking their streak. Users have the choice to select 7, 14, or 30 days for your Streak Challenge length, which gives users the freedom to give themselves a challenge they feel they can reach. By doing this, users have a shorter goal to work toward that gives a reward for maintaining the streak. Otherwise, users would have to settle for the longer-term rewards for long streaks, given at 50 days, 100 days, 150 days, and 365 days.

You will notice that in the Duolingo app, there is a pattern of creating systems that use **[Implementation Intentions](https://www.researchgate.net/publication/232586066_Implementation_Intentions_Strong_Effects_of_Simple_Plans)** to create features that have the user create an intentional commitment of continue their streak, word toward their goal, and stay consistent.

 > "If I need to <u>prolong my streak today</u>, then I will <u>complete a Duolingo lesson</u> in order to <u>work toward my goal of 30 days for my Streak Challenge</u>; otherwise, I will <u>lose my 116 day streak</u>."

The application creates a framework for users that allows them to decide to take action toward a goal, which in turn, helps solidify a user's intention to return for their Chinese lessons while giving them an impression of autonomy.

##### League System: Keep Your Spot!

<div class="d-flex justify-content-evenly">
  <img src="/images/blog/03-LeagueSystem-AlmostDZone.png" style="width: 30%;">
  <img src="/images/blog/03-LeagueSystem-First.png" style="width: 30%;">
  <img src="/images/blog/03-LeagueSystem-Promotion.png" style="width: 30%;">
</div>

The League System in Duolingo adds a competitive twist by grouping users to vie against one another. Winning comes in various forms, but there's a clear path to losing: landing in the Demotion Zone with one of the lowest scores at the league's conclusion results in demotion. Stay above this threshold, and you maintain your current standing or, if you're in the Promotion Zone, ascend to the next league.

Leagues offer more than just competition; they present a challenge of upkeep similar to maintaining a streak. Failing to earn enough XP from lessons means falling back to a previous league, which can feel like a setback after investing considerable effort. Climbing back to a former league is possible, yet it demands a significant commitment, pushing users to complete enough lessons to avoid demotion.

<div class="d-flex justify-content-evenly">
  <img src="/images/blog/03-LeagueSystem-DZone.png" style="width: 30%;">
  <img src="/images/blog/03-LeagueSystem-demotion.png" style="width: 30%;">
</div>

Despite the pressure leagues might impose, opting out isn't an option. Completion of a league automatically enrolls users in the next cycle post-lesson. This means users are continuously engaged in either staving off demotion or striving for promotion, ensuring a persistent, if challenging, engagement with the app. While lessons seem to be fun, features like these make it more stressful to have fun doing lessons, as there is a larger matter at hand: maintaining your level or moving to the next level. This competition-stimulating feature is an example of The Overjustification Effect, and how rewards may cause people to lose motivation for activities they used to believe were fun. Instead of the users wanting to do lessons, this system causes users feel like they need to do lessons to maintain their standing.

##### Don't Let Your Friend Down: Friend Quests

<div class="d-flex justify-content-evenly">
  <img src="/images/blog/03-FriendQuest.png" style="width: 30%;">
</div>
You wouldn't want to let your friend down, would you? If you do, they'll know. The Friend Quests feature in Duolingo pairs you with a mutual friend from the list of people you follow on the platform, fostering accountability for both of you to complete these quests. This way, your commitment isn't just to the app but also to your friend who depends on your contribution, just as you depend on theirs. Unlike the League System, Friend Quests are set automatically, but with a significant distinction: you sometimes have the option to choose the friend with whom you want to complete the quest. By initiating a Friend Quest, Duolingo offers another incentive to return to the app: to undertake lessons that keep you accountable to your friends. Furthermore, the app empowers you to choose your quest partner, potentially leading to selections based on who you value more, enhancing the personal connection to the learning journey.

> Thank you for reading this far! This is section 1 of 4 sections. More to be posted soon. I will be covering "Combatting Lesson Fatigue", "Variegated Reminders", and "Prestige: Stay Consistent or Lose It". Expect an update in 1 week! -Nathan Daeila

#### References

[Gollwitzer, Peter. (1999). Implementation Intentions: Strong Effects of Simple Plans. American Psychologist. 54. 493-503. 10.1037/0003-066X.54.7.493.](https://www.researchgate.net/publication/232586066_Implementation_Intentions_Strong_Effects_of_Simple_Plans)