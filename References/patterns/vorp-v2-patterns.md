omen-brain_patterns  
  
## Topic  
An evaluation of the **Omen fantasy football decision layer**, specifically the **VORP v2 scoring model**, its technical infrastructure, and strategies to move the needle against industry competitors like FantasyPros and Footballguys [1-3].  
  
## Main Finding  
The biggest takeaway is that a **hybrid A+B VORP model** (Net Value + Positional Scarcity Bonus) combined with **on-premise LLM reasoning** provides a more robust and explainable decision framework than the static consensus rankings currently used by industry leaders [311, 317, Conversation History].  
  
## Useful For Omen  
How this research helps specific features:  
- **Omen of the Week (MVP Move):** Uses an **on-premise LLM (Gemma)** to reason against live signals like **OpenWeatherMap** and **ESPN schedule context** to surface the single highest-value team action [4, 5].  
- **Trade Analyzer:** Employs a **depth discount (0.5x and 0.25x)** in uneven trades and a **+2.0 scarcity bonus** for elite players to solve the common "quantity-over-quality" evaluation error [6, 7].  
- **Draft Assistant:** Leverages **Value-Based Drafting (VBD)** logic to identify "bargains" and "steals" by calculating the gap between a player's VOR rank and their Average Draft Position (ADP) [8].  
- **Start/Sit:** Can implement **Gaussian Mixture Models** (clustering) or **Ridge Regression** to create natural tiers that account for matchup difficulty and injury risk [9, 10].  
- **Waiver Wire:** Uses the **replacement-level floor** (the best player freely available in 12-team leagues) to determine if a free agent provides a genuine scoring differential over current bench assets [6].  
  
## Not Useful For Omen  
- **Pure "Total Points" Models:** Standard models that maximize raw point totals often lead to poor draft/trade decisions because they fail to account for **positional scoring differentials** [11, 12].  
- **Random Genetic Algorithms:** Research shows that purely random genetic algorithms are ineffectual for fantasy sports because the search space for transfers is too vast, causing them to plateau below simpler **recursive knapsack algorithms** [13, 14].  
- **Generic 14-Day Free Trials:** Evidence suggests that fixed trial windows are often too short for users to achieve **"workflow integration"**; a hybrid freemium model is superior for long-term retention [15-17].  
  
## Risks / Limitations  
- **Opportunity Forecasting:** The model's accuracy is heavily reliant on **workload estimates** (targets/carries), which are volatile and hard to predict without human intervention or advanced simulation [18, 19].  
- **Technical Debt in Sync Adapters:** Maintaining real-time connections to ESPN, Yahoo, and Sleeper is a "maintenance headache" due to changing APIs and cookie-based authentication requirements [5, 20, 21].  
- **Model Overfitting:** Complex forecasting models like higher-order ARIMA tend to overfit in-sample fluctuations, which may not persist during the noisy 18-week NFL season [22].  
  
## Data/API Notes  
- **Live Signals:** **OpenWeatherMap** (weather), **ESPN Scoreboard API** (travel/home-away/game time), and **Sportradar** (Matchup DvP - coming soon) [4, 23].  
- **Platform Connections:** Yahoo (OAuth 2.0), Sleeper (Public API), and ESPN (Vault-encrypted S2/SWID cookies) [5, 7].  
- **Infrastructure:** **Supabase** for Auth and Vault encryption, **Upstash Redis** for roster caching, and **Infisical** for secret management [5, 7].  
- **Proprietary Moat:** By running **Ollama + Gemma** internally on a private VPS, Omen keeps its reasoning logic "black-boxed" and proprietary [5, 7].  
  
## Recommendation  
- **Use Now:** The **VORP v2 Trade Analyzer** and the current platform-agnostic adapter architecture [5, 6].  
- **Needs More Research:** Implementing **Recursive Rolling-Horizon Planning** (specifically a **2-week time horizon**) which research identifies as the most effective for season-long optimization [13, 24].  
- **Skip:** Purely sales-led acquisition; focus on **Product-Led Growth (PLG)** with personalized in-app conversion triggers [25, 26].  
  
## Open Questions  
- What is the optimal **"Correlation Multiplier"** to use in the Draft Assistant to encourage team "stacking" (e.g., QB/WR pairs)? [27, 28]  
- How do we precisely calibrate the **"Injury Risk Adjustment"** within the Net VORP formula to keep it dynamic throughout the season? [6]  
- Can we automate **Opportunity Forecasting** by determining team play pace and defensive effectiveness instead of relying on external projections? [29]  
