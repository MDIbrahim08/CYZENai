// CYZEN Blog Data - Part 6: WEB & EMAIL HYGIENE
// This file contains extremely detailed, beginner-friendly guides for non-technical users.

const blogsPart6 = [
    {
        id: "email-security-guide",
        title: "The Digital Mailman: How to Keep Your Inbox Clean and Safe",
        category: "Email Safety",
        author: "CYZEN Inbox Lab",
        date: "March 15, 2026",
        readTime: "25 min read",
        image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=1000",
        excerpt: "Your email is the master key to your digital life. Learn how to handle 'Junk Mail', dangerous attachments, and why you should never click 'Unsubscribe' on a scam email.",
        content: `
            <h2>Your Email is Your Digital Passport</h2>
            <p>Think about it: every website you sign up for, every bank account you open, and every social media profile you create is linked to your email address. If a hacker gets into your email, they can go to any of those other sites and click 'Forgot Password'. The reset link goes to <em>them</em>, and suddenly, they own your entire digital life. That is why your email inbox is the most important thing to protect.</p>

            <h2>1. Handling 'Junk' and 'Spam' (The Trash Analogy)</h2>
            <p>Imagine your physical mailbox is stuffed with hundreds of flyers for things you don't want. Most of us just throw them in the recycling. But on the internet, some of those 'flyers' are coated in a digital poison.</p>
            <p><strong>The 'Unsubscribe' Trap:</strong> If you get a legitimate email from a store like Gap or Amazon, the 'Unsubscribe' button is safe. But if you get a weird email from a stranger offering you 'Cheap Meds' or 'Free Prizes', <strong>never click Unsubscribe</strong>.</p>
            <p>Why? Because clicking 'Unsubscribe' tells the scammer that your email address is <em>active</em> and that a real human is reading it. They will then sell your address to thousands of other scammers, and you'll get ten times more spam tomorrow.</p>
            <p><strong>The Solution:</strong> Just click the <strong>'Report Spam'</strong> or <strong>'Junk'</strong> button in your email app. This tells your email provider to block that sender and helps protect other people too.</p>

            <h2>2. Attachments: The 'Mystery Package'</h2>
            <p>Imagine a stranger leaves a package on your doorstep with a note that says: <em>"Open this for a surprise!"</em> You'd probably be a bit nervous. An email attachment is exactly the same thing.</p>
            <p>Scammers love to send files named things like <em>'Invoice_123.pdf'</em> or <em>'Refund_Details.zip'</em>. When you double-click that file, you aren't opening a document; you are running a tiny program that installs malware or a 'Pocket Spy' on your computer.</p>
            
            <div class="tip-box">
                <strong>Rule of Thumb:</strong> If you weren't expecting a file, don't open it. Even if it looks like it's from a friend, their email might have been hacked. Call or text them first to ask: <em>"Did you just send me a PDF?"</em>
            </div>

            <h2>3. The 'Reply-To' Trick</h2>
            <p>Sometimes an email looks like it's from <em>'support@bank.com'</em>, but if you look very closely at the 'Reply-To' address, it's actually <em>'hacker@scam-site.ru'</em>. It's like someone wearing a mask—they look like your friend, but when they speak, it's a different person entirely. Always check the actual email address, not just the name at the top.</p>

            <h2>4. Use 'Email Aliases' (The Shield)</h2>
            <p>Do you really want to give your primary bank email address to a random website just to get a 10% discount on a t-shirt? Probably not. If that store gets hacked, your private email is now on a hacker's list.</p>
            <p><strong>The Solution:</strong> Use an 'Alias' or a 'Burner' email for shopping and newsletters. Services like <em>SimpleLogin</em> or <em>Firefox Relay</em> let you create fake email addresses that forward to your real one. If the store starts spamming you or gets hacked, you can just 'turn off' that fake address and your real inbox stays safe.</p>

            <h2>Summary: Your 'Clean Inbox' Checklist</h2>
            <ul>
                <li><strong>Never</strong> click 'Unsubscribe' on suspicious emails.</li>
                <li><strong>Never</strong> open an attachment you weren't expecting.</li>
                <li><strong>Always</strong> use a unique, long passphrase for your email account.</li>
                <li><strong>Enable</strong> 2FA (the 'Deadbolt') on your email today. It's the single most important thing you can do.</li>
            </ul>
        `
    },
    {
        id: "web-browsing-safety",
        title: "The Wild West: How to Browse the Web Without Getting 'Shot'",
        category: "Web Safety",
        author: "CYZEN Web Team",
        date: "March 10, 2026",
        readTime: "22 min read",
        image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=1000",
        excerpt: "The internet is a vast frontier. Learn how to spot 'Drive-by' infections, why browser extensions are like 'Extra Keys', and how to use 'Private Mode' correctly.",
        content: `
            <h2>The Internet Frontier</h2>
            <p>Browsing the web today is like walking through a massive city. There are beautiful parks and museums (websites like Wikipedia or News sites), but there are also dark alleys where trouble is waiting. Staying safe isn't about avoiding the city; it's about knowing which streets to stay off of.</p>

            <h2>1. Browser Extensions: The 'Extra Keys' Warning</h2>
            <p>Browser extensions (like 'Ad-blockers', 'Coupon Finders', or 'Dark Mode' tools) are very helpful. But think of an extension as giving a stranger <strong>an extra key to your house</strong>. Many extensions have the power to 'Read and change all your data on all websites'.</p>
            <p>This means they can see your bank balance, read your private emails, and track every single thing you type. Some 'free' extensions are actually built by scammers to steal your data.</p>
            
            <div class="tip-box">
                <strong>Pro Tip:</strong> Only install extensions from big, trusted companies. If you have 20 extensions you don't use, delete them today. Every extension is a potential 'back door' for a hacker.
            </div>

            <h2>2. 'Drive-By' Infections</h2>
            <p>Did you know you can get a virus just by visiting a website? You don't even have to click anything. This is called a <strong>'Drive-By Download'</strong>. It happens on shady websites (like sites for free movies or 'cracked' software). The website uses a tiny 'hole' in your browser to sneak a virus onto your computer while the page is loading.</p>
            <p><strong>The Solution:</strong> Keep your browser (Chrome, Safari, Firefox) updated. These updates are constantly patching those 'holes' so 'Drive-By' attacks can't get through.</p>

            <h2>3. 'Incognito' or 'Private' Mode: The Great Myth</h2>
            <p>Many people think that using <strong>Incognito Mode</strong> makes them invisible to hackers and the government. <strong>This is false.</strong></p>
            <p>Incognito mode only does <strong>one thing</strong>: it doesn't save your history on <em>your</em> computer. It's like wearing a disguise inside your own house—your family won't know where you went, but once you step outside, the rest of the world (the websites you visit, your ISP, and the government) can still see you perfectly clearly.</p>

            <h2>4. Spotting Fake 'Warning' Pop-ups</h2>
            <p>You're browsing the web and suddenly your screen turns red and a loud siren sounds. A message says: <em>"YOUR COMPUTER IS INFECTED WITH 57 VIRUSES! CLICK HERE TO CLEAN NOW!"</em></p>
            <p><strong>The Truth:</strong> This is a 100% fake. Your web browser cannot 'scan' your computer for viruses. This is a scam designed to scare you into downloading real malware or calling a fake 'Tech Support' number. If you see this, just <strong>close the browser tab</strong>. If it won't close, restart your computer. Nothing bad has happened yet—as long as you didn't click the button!</p>

            <h2>Summary: Your 'Safe Browser' Checklist</h2>
            <ol>
                <li><strong>Update</strong> your browser as soon as you see the notification.</li>
                <li><strong>Uninstall</strong> any extensions you don't use.</li>
                <li><strong>Look</strong> for the Padlock (HTTPS) on every site.</li>
                <li><strong>Ignore</strong> 'Virus Warning' pop-ups on websites.</li>
                <li><strong>Avoid</strong> 'free' movie or 'cracked' software sites—they are the dark alleys of the internet.</li>
            </ol>
        `
    },
    {
        id: "junk-mail-filter",
        title: "The Junk Mail Filter: Training Your Inbox to Stay Clean",
        category: "Email Safety",
        author: "CYZEN Email Team",
        date: "June 12, 2026",
        readTime: "15 min read",
        image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&q=80&w=1000",
        excerpt: "Is your inbox full of junk? Learn how the 'Spam' filter works and how you can train it to catch scammers before you even see them.",
        content: `
            <h2>The Digital Bouncer</h2>
            <p>Your email provider (like Gmail or Outlook) has a 'Spam' or 'Junk' folder. Think of this as a <strong>Digital Bouncer</strong> standing at the door of your inbox. Its job is to look at every incoming email and decide if it's safe to let in.</p>

            <h2>1. How the Bouncer Decides</h2>
            <p>The filter looks for 'red flags' like:
            <ul>
                <li><strong>Known Scammers:</strong> Has this email address been reported by thousands of other people?</li>
                <li><strong>Trigger Words:</strong> Does the email contain words like 'Winner', 'Inheritance', or 'Urgent' in all caps?</li>
                <li><strong>Hidden Links:</strong> Is the email full of links that go to shady websites?</li>
            </ul></p>

            <h2>2. Training Your Bouncer</h2>
            <p>The filter isn't perfect. Sometimes a scam gets through, and sometimes a real email gets blocked. You can train it:
            <br>If you see a scam in your inbox, <strong>don't just delete it.</strong> Mark it as <strong>'Report Spam'</strong>. This tells the system exactly what to look for next time.
            <br>If a real email ends up in Junk, mark it as <strong>'Not Spam'</strong> to ensure it goes to your inbox in the future.</p>

            <h2>3. The 'Unsubscribe' Trick</h2>
            <p>If you're getting legitimate ads from a shop you visited once, use the 'Unsubscribe' button at the bottom. But <strong>be careful</strong>: if the email looks like a scam, <strong>do not</strong> click 'Unsubscribe'. Scammers use that button to confirm that your email address is active, which will lead to even more spam.</p>

            <div class="tip-box">
                <strong>Temporary Emails:</strong> If you need to sign up for a website just once and don't want them to have your real email, use a 'Burner Email' service (like 10MinuteMail). It gives you an address that disappears after 10 minutes.
            </div>

            <h2>Summary Tips:</h2>
            <ul>
                <li><strong>Report</strong> spam instead of just deleting it.</li>
                <li><strong>Check</strong> your Spam folder once a week for 'False Positives'.</li>
                <li><strong>Never</strong> reply to a spam email—it just proves you are a real person.</li>
            </ul>
        `
    },
    {
        id: "web-tracking-guide",
        title: "The Invisible Stalkers: Understanding Web Cookies and Tracking",
        category: "Web Safety",
        author: "CYZEN Privacy Lab",
        date: "June 15, 2026",
        readTime: "20 min read",
        image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&q=80&w=1000",
        excerpt: "Ever feel like ads are following you around the internet? Learn how 'Cookies' track your movements and how to regain your privacy.",
        content: `
            <h2>The Breadcrumb Trail</h2>
            <p>When you browse the web, you leave behind a trail of <strong>Digital Cookies</strong>. A cookie is just a tiny file that a website saves on your computer so it can 'remember' you later. While some cookies are helpful (like the one that keeps you logged into your email), others are used to track your every move.</p>

            <h2>1. 'First-Party' vs. 'Third-Party'</h2>
            <p><strong>First-Party Cookies:</strong> These are set by the website you are actually visiting. They remember your shopping cart or your language settings. These are generally safe and helpful.
            <br><strong>Third-Party Cookies:</strong> These are set by companies (like advertisers) that you <em>didn't</em> visit. They 'ride along' on other sites and track you from one page to another to build a profile of your interests.</p>

            <h2>2. The 'Accept All' Trap</h2>
            <p>You've probably seen those annoying boxes that say: <em>"We use cookies. Click 'Accept' to continue."</em> Most people just click 'Accept' to get to the content.
            <br><strong>The Rule:</strong> If there is an 'Options' or 'Customize' button, click it. Often you can turn off 'Marketing' and 'Tracking' cookies while still keeping the 'Essential' ones.</p>

            <h2>3. How to Clean Your Trail</h2>
            <p>Every browser has a setting to 'Clear Browsing Data'. Doing this once a month is like sweeping your digital floor. It deletes all the tracking cookies and starts you with a clean slate.</p>

            <div class="tip-box">
                <strong>Privacy Browsers:</strong> If you're tired of being tracked, try a browser like <strong>Brave</strong> or <strong>Firefox</strong> with 'Enhanced Tracking Protection' turned on. They automatically block those third-party trackers so you don't have to worry about them.
            </div>

            <h2>Summary Tips:</h2>
            <ul>
                <li><strong>Reject</strong> tracking cookies when websites ask.</li>
                <li><strong>Clear</strong> your browser cookies once a month.</li>
                <li><strong>Use</strong> 'DuckDuckGo' as your search engine if you don't want your searches recorded.</li>
            </ul>
        `
    }
];

// Initialize global blog storage
if (!window.cyzenBlogs) window.cyzenBlogs = [];
window.cyzenBlogs = [...window.cyzenBlogs, ...blogsPart6];
