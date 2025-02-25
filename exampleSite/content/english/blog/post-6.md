---
date: "2025-02-05"
title: "Every Website Needs to be Redesigned (Again) for Agent Experience (AX)"
image: "images/blog/06.png"
categories: ["AI", "Web-Dev", "Product"]
draft: false
---

Redesigning the internet for User Experience was hard enough - but humans aren't the only users of the internet anymore. We may need to redesign every website, app, and service for the Consumer AI Assistants of 2030... I understand how this sounds like an overexaggeration, but it isn't. 

The CEO of Netlify just coined a groundbreaking new term **"Agent Experience" (AX)** and nobody's talking about it yet. Here's exactly why we need to start thinking about AX:

### 1) AI is being used to advise people's product choices.

And I don't just mean asking ChatGPT which product is best. Large Language Models (LLMs) are trained by scraping the web. That means every new-age app with AI Agent features will use web-scraped knowledge to operate. If the features of your website are not web-scraper accessible, chances are the apps of 2028 will not recommend or use your tools.

But even if you fully optimize your site for web-scraper access, the logical, pragmatic AI Agents (different from web-scrapers) of the future viewing and interacting with your website may see through your clever **Marketing/UX/Sales** tactics and weigh options pragmatically for their human. Here is a condensed version of the conversations I imagine will happen between Siri in 2030 and a human:

> **Human:** "I want to book a flight to Seattle for Wednesday."  
> **Siri:** "Sure. Do you want to book a round-trip or one-way?"  
> **Human:** "One-way."  
> ... *(more back-and-forth conversation over preference)* ...  
> **Siri:** "Okay, I found 2 flights that match your preferences. The flight from Booking.com is cheapest, but the one from Expedia comes with free cancellation – which one should I book?"  
---

As you can see, the human never interacts with your website. Instead, the **AI Agent acts as a proxy** and makes it happen.  
**Human → AI Agent → Computer Interaction** considerations will make or break your existing sales funnel.  

---

### 2) Human → AI Agent → Computer Interaction

AI Agent task automation will rely on "AI Agent Accessibility" (I think I just coined this term). 

Let's say in the year 2032 you tell Siri to book a flight on your behalf to Seattle on the 7th of April. In the backend, Siri might try to book it using a **new browser automation feature** akin to OpenAI's Operator and Anthropic's Computer Use. 

But if a given Flights website like Expedia does not have **buttons with a clear call-to-action** that is easily identifiable by an LLM, Siri the AI Agent may pivot to a competitor website, and you may lose the sale.

But that's not all – the functionality of your site may restrict/limit AI Agents.  

#### 2FA/CAPTCHA: AI Agents Hate Them
If Siri's future automation feature opens a website, tries to log into your account, then gets blocked by **2FA or CAPTCHA**, the flight cannot get booked, regardless of how accessible your website is.  

> 🔗 **[Apple's solution to the CAPTCHA problem](https://support.apple.com/guide/iphone/sign-in-with-fewer-captcha-challenges-iph4f43a30c9/ios#:~:text=iCloud%20allows%20you%20to%20bypass,Automatic%20Verification%20on%20or%20off.)**  

#### Page Load Time: AI Agents are Impatient
Web Scraper navigation velocity will be **faster than a human**. Even though 1-second page load times are okay for humans, an AI Agent may miss information on your website that fails to load within a reasonable amount of time. **Dynamic webpages may cause AI-Agent Accessibility issues** if they take too long to load. If Siri the AI Agent cannot find the search bar on your site on time, or does not see the "Book a Flight" button, it may pivot to a competitor site prematurely to provide its human faster results.  

---

### 3) AI Agent → Computer Interaction

AI Agents need tools and infrastructure to interact with (need proof? Take a look into Netlify's recent success collaborating with Bolt.new).

Before **Web 2.0**, there was almost no **Human Interaction** with websites, other than viewing content. **Web 2.0** introduced the CRUD app, enabling more types of **Human Interaction** and creating more value from the internet.  

Just like humans need **buttons and a proper GUI** to interact with, **AI Agents will require similar tailor-made interfaces**. Fortunately, **AI-Agent Experience and Software Developer Experience** have a lot in common:  

AI Agents will interact with the world using **APIs**, so building backends with uniform procedures such as **RESTful APIs with metadata descriptors** will enable AI Agents to understand your website and use your APIs frictionlessly, just like how an end-user frictionlessly uses a well-designed graphical interface.

---

Remember using AWS for the first time and you had to log into the console and build stuff by hand? You had to spin up an EC2 instance or write code directly into a Lambda function. **AWS CloudFormation and Cloud Development Kit (CDK)** fixed that by allowing developers to spin up templated infrastructure directly from the command line – **Infrastructure as Code**.  

Likewise, AI Agents will use these same types of affordances to build.  

Say it’s the year 2030 again and your company just bought a new server. What if all you had to do is **install a blank instance of AWS-Cloud OS (I think Coolify & Ubicloud is already doing this part)** onto that server, then you told the **AI Agent on your laptop to build an app** on that server? 

Now, instead of spending **months managing server infrastructure**, or relying on the **nice abstractions** that come with AWS Cloud, you just **spin up a server and it automatically provides you the same features as the largest cloud provider** – and the AI Agent uses that equipment on your behalf, in the most efficient way possible.  

---

There are so many more considerations at play - none of which are fully-researched yet. But Moral of the Story - instead of being another company that adds a new variety of **chat bot** to your site, **consider redesigning your website from the ground up** to support the **inevitably autonomous future**.  

Think about the **affordances, allowances, and user flows** you would like to provide to the consumer/business AI Agents of 2030, and make sure you build your products with **AI Agent Accessibility** in mind.

> 🔗 **[Read the original article by Netlify CEO Mathias Biilmann](https://biilmann.blog/articles/introducing-ax/)**  

> 🔗 **[Further Reading at AgentExperience.ax](https://agentexperience.ax/articles/)**  