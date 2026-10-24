// Generated from startup-research pipeline files (pains.json, us/*.jsonl, briefs/*.md) on 2026-10-24.
// Static mock data: the app never reads the pipeline at build or run time.
import type { Idea } from "../types";

export const IDEAS: Idea[] = [
 {
  "painId": "p-072",
  "night": "2026-10-22",
  "analyst_run": "2026-10-22-us-test",
  "market": "US",
  "niche": "meal planning & recipes",
  "name": "DinnerList",
  "label": null,
  "pitch": "Tap 5 dinners, get one combined grocery list for any store: the simple Mealime that died on 21 Oct.",
  "price": {
   "text": "$3.99/month or $29/year, under Plan to Eat's $49",
   "estimate": true
  },
  "mvp": "One screen with ~40 tested weeknight dinners plus 'add your own by URL'. Tap 3–5, pick servings, get one combined, aisle-sorted list to share or copy into Instacart/Walmart. No account until you pay.",
  "killQuestion": "It's already dead: 20+ clones plus free Meals Hub and Flambette took the wedge, and a solo dev can't produce Mealime's tested-recipe catalogue in 2 weeks.",
  "description": "US home cooks lost Mealime (shut down 21 Oct 2026, folded into Albertsons' store-tied Meals Hub) and want the same thing back: pick a few dinners, get one combined grocery list for any store, no bloat. Existing planners crash (eMeals), add ads/paywalls (Samsung Food) or have weak lists (NYT Cooking, Meals Hub). Second pass (24 Oct): refugees forced into the Albertsons/Safeway apps report crashes, store-locked recipes and weak lists, and miss Mealime's ingredient-overlap meal suggestions.",
  "who": "US working parents and home cooks who plan weeknight dinners and don't shop at Albertsons-family stores",
  "source": "complaints+proven-model",
  "evidenceSummary": "Mealime shut down 21 Oct 2026; 37 complaints from 35 people across the 22 and 24 Oct runs (Play, App Store, r/mealime, r/EatCheapAndHealthy and X).",
  "complaint_ids": [
   "c-us-20261022-011",
   "c-us-20261022-012",
   "c-us-20261022-013",
   "c-us-20261022-014",
   "c-us-20261022-015",
   "c-us-20261022-016",
   "c-us-20261022-017",
   "c-us-20261022-018",
   "c-us-20261022-021",
   "c-us-20261022-029",
   "c-us-20261022-030",
   "c-us-20261022-031",
   "c-us-20261022-032",
   "c-us-20261022-033",
   "c-us-20261022-034",
   "c-us-20261022-035",
   "c-us-20261022-036",
   "c-us-20261022-037",
   "c-us-20261022-038",
   "c-us-20261022-039",
   "c-us-20261022-040",
   "c-us-20261022-041",
   "c-us-20261022-042",
   "c-us-20261022-043",
   "c-us-20261024-056",
   "c-us-20261024-057",
   "c-us-20261024-058",
   "c-us-20261024-065",
   "c-us-20261024-066",
   "c-us-20261024-067",
   "c-us-20261024-073",
   "c-us-20261024-076",
   "c-us-20261024-077",
   "c-us-20261024-078",
   "c-us-20261024-079",
   "c-us-20261024-080",
   "c-us-20261024-081"
  ],
  "quotes": [
   {
    "id": "c-us-20261022-034",
    "found_date": "2026-10-22",
    "post_date": "2026-09-29",
    "source": "reddit r/EatCheapAndHealthy",
    "link": "https://www.reddit.com/r/EatCheapAndHealthy/comments/1wtluur/dinner_is_honestly_the_most_stressful_part_of_my/",
    "quote": "I work full time and by the time i get home around 5:30 im just EXHAUSTED. And then its like immediately \"whats for dinner??\" and my brain just shuts down.",
    "engagement": "469 upvotes, 308 comments (archive snapshot), u/FollowingLimp1357",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-029",
    "found_date": "2026-10-22",
    "post_date": "2026-10-03",
    "source": "reddit r/mealime",
    "link": "https://www.reddit.com/r/mealime/comments/1wwgzns/im_devastated/",
    "quote": "I just exported 285 recipes but am really going to miss the simplicity of it all.",
    "engagement": "17 upvotes, 47 comments (archive snapshot), u/Designer_Anything806",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-037",
    "found_date": "2026-10-22",
    "post_date": "2026-10-04",
    "source": "reddit r/mealime (comment)",
    "link": "https://www.reddit.com/r/mealime/comments/1wwgzns/im_devastated/pdvm23w/",
    "quote": "I think the best part of the app was how it consolidated the grocery list based on your meal plan. I didn’t have to do any mental math of how much of an ingredient I need across all selected meals.",
    "engagement": "1 upvotes (archive snapshot), u/Designer_Anything806",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-041",
    "found_date": "2026-10-22",
    "post_date": "2026-10-21",
    "source": "reddit r/mealime (comment)",
    "link": "https://www.reddit.com/r/mealime/comments/1xafst8/mealime_founder_speaks_out/19res5iwwmum8/",
    "quote": "Even the subscription fee was absolutely reasonable and... kind of the perfect price to remind me to use it, rather than make me dislike it in any way.",
    "engagement": "1 upvotes (archive snapshot), u/scsibusfault",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-065",
    "found_date": "2026-10-24",
    "post_date": "2026-10-21",
    "source": "app_store Safeway (US storefront)",
    "link": "https://apps.apple.com/us/app/id521487551#review-14695436066",
    "quote": "They shut down a perfectly good app that doesn’t require me to put in a store that’s across the country from me.",
    "engagement": "1★ review by 'ArcToArcturus11', title: 'Rip Mealime'",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-014",
    "found_date": "2026-10-22",
    "post_date": "2026-10-20",
    "source": "google_play eMeals (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.emeals&reviewId=f41617aa-f30f-4129-b2a8-0cbe8ed5e346",
    "quote": "I felt like the cancellation process kept me going in circles and would not permit to cancel my subscription.",
    "engagement": "1★ review by 'Diane Gobbel', 0 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-040",
    "found_date": "2026-10-22",
    "post_date": "2026-10-19",
    "source": "reddit r/mealime (comment)",
    "link": "https://www.reddit.com/r/mealime/comments/1x8wzk6/turns_out_mealime_has_more_alternatives_than/phlwo3f/",
    "quote": "95% of them are \"only available on web for now\"",
    "engagement": "1 upvotes (archive snapshot), u/KimchiBreadBoy",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-031",
    "found_date": "2026-10-22",
    "post_date": "2026-10-17",
    "source": "reddit r/mealime",
    "link": "https://www.reddit.com/r/mealime/comments/1x8l4e8/iso_fully_developed_replacement_app_with_advanced/",
    "quote": "I love that I was able to set protein, cooking time, and grocery price filters for recipes Mealime recommended to me.",
    "engagement": "5 upvotes, 1 comments (archive snapshot), u/2claireFRmallory",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-032",
    "found_date": "2026-10-22",
    "post_date": "2026-10-17",
    "source": "reddit r/mealime",
    "link": "https://www.reddit.com/r/mealime/comments/1x7zgwb/my_search_for_a_replacement_not_sponsored/",
    "quote": "I liked the simplicity of Mealime the most. It didn't force pantry tracking, scheduling, macros",
    "engagement": "6 upvotes, 9 comments (archive snapshot), u/MaxWannequin",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-016",
    "found_date": "2026-10-22",
    "post_date": "2026-10-16",
    "source": "google_play Samsung Food (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.foodient.whisk&reviewId=da260a47-82d0-493e-a7a6-f5350ccd823c",
    "quote": "cannot use the recipe section while cooking, because ads LITERALLY take up 80% of screen space, even when moving to \"print mode.\"",
    "engagement": "1★ review by 'Paddy', 0 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-066",
    "found_date": "2026-10-24",
    "post_date": "2026-10-16",
    "source": "app_store Safeway (US storefront)",
    "link": "https://apps.apple.com/us/app/id521487551#review-14674542375",
    "quote": "I spent over an hour last night budgeting different items and meal planning and building my cart, just for the app to crash this morning and delete ALL my items.",
    "engagement": "2★ review by 'JoyBear419', title: 'Constant issues'",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-077",
    "found_date": "2026-10-24",
    "post_date": "2026-10-16",
    "source": "reddit r/mealime (comment)",
    "link": "https://www.reddit.com/r/mealime/comments/1x3b061/i_miss_the_ingredient_maximizing/ph45aur/",
    "quote": "I’ve seen tons of posts promoting their own versions…but then ask me to import my recipes for THEIR catalog.",
    "engagement": "2 upvotes (archive snapshot), u/xn28music",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-078",
    "found_date": "2026-10-24",
    "post_date": "2026-10-15",
    "source": "reddit r/mealime (comment)",
    "link": "https://www.reddit.com/r/mealime/comments/1x6w4me/mealime_user_feedback_survey/pgz3c7r/",
    "quote": "Reducing food waste via suggested meal plans combinations was key. I don't see that in the Meals Hub and it makes the whole thing useless to me.",
    "engagement": "7 upvotes (archive snapshot), u/hollyly",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-079",
    "found_date": "2026-10-24",
    "post_date": "2026-10-15",
    "source": "reddit r/mealime (comment)",
    "link": "https://www.reddit.com/r/mealime/comments/1x6w4me/mealime_user_feedback_survey/pgz4gkc/",
    "quote": "I cared most about the suggested meal plans so losing those makes Meals Hub a no-go for me.",
    "engagement": "5 upvotes (archive snapshot), u/girlwsquirrel",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-080",
    "found_date": "2026-10-24",
    "post_date": "2026-10-15",
    "source": "reddit r/mealime (comment)",
    "link": "https://www.reddit.com/r/mealime/comments/1x6w4me/mealime_user_feedback_survey/pgzdgly/",
    "quote": "I live in NYC and don’t live near a single one of them",
    "engagement": "3 upvotes (archive snapshot), u/green_typewriter",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-036",
    "found_date": "2026-10-22",
    "post_date": "2026-10-13",
    "source": "reddit r/mealprep",
    "link": "https://www.reddit.com/r/mealprep/comments/1x4v8nl/looking_for_a_meal_tracker_that_repeats_my_meals/",
    "quote": "I just want to save my own recipes, set 3 options for each meal, and have them show up every day automatically.",
    "engagement": "1 upvotes, 0 comments (archive snapshot), u/sleepshadez",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-015",
    "found_date": "2026-10-22",
    "post_date": "2026-10-12",
    "source": "google_play Plan to Eat (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.plantoeat.mobile&reviewId=17e0701b-01d5-402d-ba3f-f9d1f2153d92",
    "quote": "the advertised price is $49/year, or $5.95 a month, but when you try to subscribe it only offers an annual subscription for $54.99.",
    "engagement": "1★ review by 'N. Noll', 0 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-035",
    "found_date": "2026-10-22",
    "post_date": "2026-10-12",
    "source": "reddit r/mealprep",
    "link": "https://www.reddit.com/r/mealprep/comments/1x3lasy/meal_plan_app/",
    "quote": "Does anybody know if there's a free app that helps you make a meal plan for the  week?",
    "engagement": "0 upvotes, 14 comments (archive snapshot), u/Ill-Giraffe2900",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-076",
    "found_date": "2026-10-24",
    "post_date": "2026-10-11",
    "source": "reddit r/mealime",
    "link": "https://www.reddit.com/r/mealime/comments/1x3b061/i_miss_the_ingredient_maximizing/",
    "quote": "the fact that they try and say that the Albertsons meal planning is the same thing is a joke.",
    "engagement": "22 upvotes, 37 comments (archive snapshot), u/New_Driver_39",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-057",
    "found_date": "2026-10-24",
    "post_date": "2026-10-10",
    "source": "google_play Albertsons (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.safeway.client.android.albertsons&reviewId=218243f8-64b7-463c-8118-297c69506104",
    "quote": "forced to use due to mealime shutting down...I can't view recipes if I don't have any services near me? how is this an appropriate replacement",
    "engagement": "1★ review by 'Tanya Rodgers', 0 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-058",
    "found_date": "2026-10-24",
    "post_date": "2026-10-09",
    "source": "google_play Safeway (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.safeway.client.android.safeway&reviewId=a94d02c2-0c46-4a53-ab8c-17551de3ef51",
    "quote": "the recipes function is awful, I came from Mealime and the shopping list is almost useless.",
    "engagement": "1★ review by 'Steven Tinoco', 1 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-030",
    "found_date": "2026-10-22",
    "post_date": "2026-10-08",
    "source": "reddit r/mealime",
    "link": "https://www.reddit.com/r/mealime/comments/1x0im2m/non_ai_slop_app_alternatives/",
    "quote": "I've been looking for a Mealime alternative but everyone is posting their slop apps with clearly AI generated images in their marketing.",
    "engagement": "19 upvotes, 45 comments (archive snapshot), u/KimchiBreadBoy",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-011",
    "found_date": "2026-10-22",
    "post_date": "2026-10-07",
    "source": "google_play eMeals (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.emeals&reviewId=fe35e1df-cbea-47a2-b26e-62cf0159d0a5",
    "quote": "For YEARS I've repeatedly had to uninstall it and reinstall it to update menus.",
    "engagement": "1★ review by 'C Vick', 13 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-056",
    "found_date": "2026-10-24",
    "post_date": "2026-10-06",
    "source": "google_play Albertsons (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.safeway.client.android.albertsons&reviewId=9ad4a9a0-0f81-4a92-9cc4-f9ed402fe513",
    "quote": "I only got this app because they bought out Mealime. this app is terrible! it's glitchy and doesn't load most of the time!",
    "engagement": "1★ review by 'christopher butcher', 0 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-039",
    "found_date": "2026-10-22",
    "post_date": "2026-10-05",
    "source": "reddit r/mealime (comment)",
    "link": "https://www.reddit.com/r/mealime/comments/1wwpehq/not_to_harp_on_mealime_shutting_down_but_help/pdwjegn/",
    "quote": "The only thing I hate about it is that the grocery list feature sucks so I end up copy/pasting into the notes app",
    "engagement": "1 upvotes (archive snapshot), u/Artistic_Drummer_791",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-043",
    "found_date": "2026-10-22",
    "post_date": "2026-10-05",
    "source": "x",
    "link": "https://x.com/li_yumei_/status/2107189963699941777",
    "quote": "I use AI to meal plan (all from my recipe vault) because I hate that mental load.",
    "engagement": "@li_yumei_ (location: Maryland, USA), 0 likes, 1 replies",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-038",
    "found_date": "2026-10-22",
    "post_date": "2026-10-04",
    "source": "reddit r/mealime (comment)",
    "link": "https://www.reddit.com/r/mealime/comments/1wwgzns/im_devastated/pds29yu/",
    "quote": "My favorite thing about Mealime was the automatic grocery list generated from my meal plan. Does this app do that?",
    "engagement": "1 upvotes (archive snapshot), u/HEXAPONG",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-073",
    "found_date": "2026-10-24",
    "post_date": "2026-10-04",
    "source": "app_store NYT Cooking (US storefront)",
    "link": "https://apps.apple.com/us/app/id911422904#review-14627921304",
    "quote": "Great recipes but wish they made it easier to export a grocery list",
    "engagement": "3★ review by 'RomeoXantos', title: 'Great recipes but wish they made it easier to export a grocery list'",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-033",
    "found_date": "2026-10-22",
    "post_date": "2026-10-03",
    "source": "reddit r/mealime",
    "link": "https://www.reddit.com/r/mealime/comments/1wwpehq/not_to_harp_on_mealime_shutting_down_but_help/",
    "quote": "I am currently trying emeals, but I really, really, feel meh about their recipes.",
    "engagement": "6 upvotes, 13 comments (archive snapshot), u/prncsclo",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-042",
    "found_date": "2026-10-22",
    "post_date": "2026-10-03",
    "source": "reddit r/mealime (comment)",
    "link": "https://www.reddit.com/r/mealime/comments/1wwgzns/im_devastated/pdmcn7y/",
    "quote": "I ended up making some weekly plans up of my favorite recipes, printing out the weekly grocery list and the recipes, and compiling it into an old school recipe book.",
    "engagement": "1 upvotes (archive snapshot), u/Mrs-Dr-Pepper",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-081",
    "found_date": "2026-10-24",
    "post_date": "2026-10-01",
    "source": "reddit r/MealPrepSunday (comment)",
    "link": "https://www.reddit.com/r/MealPrepSunday/comments/1wucza7/meal_plan_services_with_grocery_lists_and_prep/pd8wh6a/",
    "quote": "Right now I pay $6/month for the one I have. I wouldn't want to spend more than probably $15-$20",
    "engagement": "1 upvotes (archive snapshot), u/PayKay223",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-012",
    "found_date": "2026-10-22",
    "post_date": "2026-09-30",
    "source": "google_play eMeals (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.emeals&reviewId=2a681116-abd6-4988-9362-a6abd3a7615f",
    "quote": "The convenience of the meal planning plus linking to your shopping cart is great, but it isn't worth the headache of the constant glitches and crashing.",
    "engagement": "2★ review by 'Bethany', 1 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-017",
    "found_date": "2026-10-22",
    "post_date": "2026-09-30",
    "source": "google_play Samsung Food (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.foodient.whisk&reviewId=b959ed4f-1a58-49bb-bcbf-13deea5d1c36",
    "quote": "Made me do all the setup stuff only to turn around and say it's $83 a year.",
    "engagement": "3★ review by 'Just Me', 2 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-021",
    "found_date": "2026-10-22",
    "post_date": "2026-09-28",
    "source": "google_play NYT Cooking (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.nytimes.cooking&reviewId=f5b8192e-1db3-4216-8946-75ad55da0678",
    "quote": "I'm so sad Mealime is being shut down and using this NYT Cooking app made me even more sad. Yes, you can add recipes to a \"grocery list\" but it does not combine duplicate items from multiple recipes or organize the ingredients in any way",
    "engagement": "3★ review by 'Alexander Beck', 0 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-067",
    "found_date": "2026-10-24",
    "post_date": "2026-09-27",
    "source": "app_store MealPrepPro (US storefront)",
    "link": "https://apps.apple.com/us/app/id1249805978#review-14601730495",
    "quote": "I used Mealime for years and loved it. But they sold out to a grocery store chain and I was looking for a replacement. Tried this one and hated it: no ability to add your own recipes",
    "engagement": "1★ review by 'SleepyLabRat', title: 'I hate it'",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-018",
    "found_date": "2026-10-22",
    "post_date": "2026-09-24",
    "source": "google_play Samsung Food (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.foodient.whisk&reviewId=6bbb7c91-f33a-4800-86ef-c81d060022aa",
    "quote": "This app was much better when it was Whisk.",
    "engagement": "1★ review by 'Jennifer', 1 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-013",
    "found_date": "2026-10-22",
    "post_date": "2026-09-23",
    "source": "google_play eMeals (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.emeals&reviewId=13df0508-d757-497e-8229-fceb10aef521",
    "quote": "I JUST SPENT 20 MINUTES JUST TRYING TO GET THE THING TO LOAD INSTEAD OF PLANNING MY MEALS AND LIST. now I have no groceries or dinner for tonight.",
    "engagement": "1★ review by 'Alyson Oltmann', 0 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   }
  ],
  "proven_models": [
   {
    "id": "pm-us-20261022-01",
    "found_date": "2026-10-22",
    "app": "Mealime (weekly meal planner + combined grocery list)",
    "country": "USA",
    "model_and_price": "Freemium meal planner; Pro subscription (price not re-fetched tonight). Pick dinners, get ONE combined grocery list, send to Instacart/Walmart/Target. Shut down 21 Oct 2026; Pro free during farewell period (APKMirror release notes 4.21.35: https://www.apkmirror.com/apk/mealime-meal-plans-inc/mealime-meal-plans-recipes/mealime-meal-plans-recipes-4-21-35-release/).",
    "traction_evidence": "Albertsons integrated Mealime into its Meal Plans feature (press release 14 Dec 2021: https://www.albertsonscompanies.com/newsroom/press-releases/news-details/2021/Albertsons-Companies-Launches-New-Digital-Features-with-Meal-Planning-Solutions--Auto-Replenishment/default.aspx). Change.org petition by a US dietitian with '100,000+ followers' who used it weekly since 2018 asks Albertsons to keep it and says 'Charge us a subscription. Keep a paid Pro tier.' (https://www.change.org/p/albertsons-please-don-t-kill-the-mealime-app-i-am-literally-begging-you). r/mealime: 73 posts in 30 days, top user threads 17↑/47 comments ('I’m devastated') and 19↑/45 comments. No public user or revenue number found (not invented).",
    "us_status": "Incumbent exited. Official successor Meals Hub lives inside Albertsons-family store apps (Safeway, Vons, Jewel-Osco) and drops scaling/calendar per a third-party review (https://getmealpot.com/mealime/replacement/). Established alternatives: Plan to Eat $5.95/mo or $49/yr (https://www.plantoeat.com/pricing), Paprika, AnyList, Samsung Food, eMeals, Ollie ($7.5M seed, https://techcrunch.com/2026/09/03/ollie-is-betting-privacy-can-win-the-ai-assistant-race/). Plus 20+ indie replacements launched in 30 days (r/mealime posts by WeeknightBite, supperz, Flambette, Vulture, SimmerThyme, Tivvy, nGuten, Dinnerdesk, Family Plate, Wanda, Suppa, Krydda, Lilara...; X posts by Bíadán, CartCoach, PrepWise, Budget Bro, Cleaver, Plate & Page, Madas Meals, MealprepAI).",
    "entry_point": "Store-agnostic 'pick 5 dinners, get one combined, aisle-sorted list' for Mealime refugees who don't shop at Albertsons banners.",
    "why_not_done_yet": "It is being done: the entry point is the exact pitch of 20+ launches in the last 30 days, and r/mealime users are openly hostile to them ('everyone is posting their slop apps'). Mealime's moat was a curated, tested recipe catalogue, which a solo dev cannot recreate in 2 weeks (assessment).",
    "lifecycle_evidence": "Maturity: category since 2008 (Plan to Eat story: https://www.plantoeat.com/about/story/); a long-time leader just exited into a grocer (Albertsons); competitor count rising sharply (20+ new in a month); prices flat-to-down (official successor free; Plan to Eat $49/yr); complaint/review spike around the 21 Oct shutdown. Search trend not checked (no Google Trends access). Assessment.",
    "stream": "proven-model",
    "market": "US"
   },
   {
    "id": "pm-us-20261022-03",
    "found_date": "2026-10-22",
    "app": "Plan to Eat (bring-your-own-recipes planner)",
    "country": "USA",
    "model_and_price": "Pure subscription, no free plan: $5.95/month or $49/year on the web, 14-day trial without card, 60-day refund, no auto-renew by default (https://www.plantoeat.com/pricing). In-app the yearly price shows $54.99 and new app subscribers report no monthly option (US Play review 2026-10-12).",
    "traction_evidence": "Customer-funded, 'No investors' (https://www.plantoeat.com/about/); 'trusted by 50k+ meal planners' (own pricing page); 'tens of thousands of customers' (DigitalOcean case study: https://www.digitalocean.com/customers/plan-to-eat); 6,114 US App Store ratings (iTunes search tonight); 100,000+ Play installs, 4.70★ from 3,340 ratings (google-play-scraper tonight). Founded 2008/2009 by a solo developer (https://www.plantoeat.com/about/story/).",
    "us_status": "Strong and liked: a Mealime refugee wrote 'I just switched to Plan to Eat, you do have to bring your own recipes but the planning features and shopping list are amazing, way better than Mealime.' (r/mealime comment pelb296).",
    "entry_point": "Proof that a solo-founded, customer-funded meal-planner subscription works in the US; the same niche is now crowded.",
    "why_not_done_yet": "It is done, by Plan to Eat itself, for 17 years.",
    "lifecycle_evidence": "Maturity: 17-year-old product, stable price ($49/yr), many competitors. Assessment.",
    "stream": "proven-model",
    "market": "US"
   },
   {
    "id": "pm-us-20261022-04",
    "found_date": "2026-10-22",
    "app": "Ollie (AI family meal planner, now family assistant)",
    "country": "USA",
    "model_and_price": "Subscription, $9.99/month for new sign-ups (Press Herald, 27 Aug 2025: https://www.pressherald.com/2025/08/27/tired-of-meal-planning-or-nagging-your-spouse-outsource-it-to-a-machine/).",
    "traction_evidence": "'More than 50,000 families use the app' (Press Herald, 2025); $7.5M seed led by Khosla Ventures (TechCrunch, 3 Sep 2026: https://techcrunch.com/2026/09/03/ollie-is-betting-privacy-can-win-the-ai-assistant-race/); 938 US App Store ratings (iTunes search tonight).",
    "us_status": "Funded US leader for AI meal plans; now pivoting to an all-family assistant via text messaging (TechCrunch). Other AI planners: Samsung Food Food+ (paid), MealPrepPro, dozens of new ones.",
    "entry_point": "None for Judi: AI 'plan my week' is a funded, crowded race.",
    "why_not_done_yet": "Done and funded.",
    "lifecycle_evidence": "Growth for AI meal planning (new $7.5M round Sep 2026, many launches), within a mature meal-planning category. Assessment.",
    "stream": "proven-model",
    "market": "US"
   },
   {
    "id": "pm-us-20261024-05",
    "found_date": "2026-10-24",
    "app": "Workweek Lunch (creator meal-prep plans) / Restaurant Dropout (Substack plans)",
    "country": "US",
    "model_and_price": "Workweek Lunch Pro $12/mo for weekly meal-prep plans with grocery lists (https://workweeklunch.com/weekly-meal-plans/). Restaurant Dropout: $6/mo or $65/yr Substack meal plans (https://restaurantdropout.substack.com/about).",
    "traction_evidence": "Workweek Lunch had 4,000 active subscribers, 25k+ lifetime customers and ~$2M lifetime revenue when acquired by Mealprep on Fleek in 2023 (https://theygotacquired.com/content/workweek-lunch-acquired-by-mealprep-on-fleek/). Restaurant Dropout subscriber count not found.",
    "us_status": "US users displaced by Mealime's shutdown want a ready recipe database plus plans, not an empty recipe keeper: https://www.reddit.com/r/mealime/comments/1x3b061/i_miss_the_ingredient_maximizing/ ; willingness to pay $6–20/mo: https://www.reddit.com/r/MealPrepSunday/comments/1wucza7/meal_plan_services_with_grocery_lists_and_prep/pd8wh6a/",
    "entry_point": "Content-led subscription (weekly plan + grocery list + leftovers/ingredient-overlap logic) sold via Lemon Squeezy/Polar; the hard part is recipe content and audience, not code. Assessment.",
    "why_not_done_yet": "Many founders are pitching Mealime replacements in r/mealime right now, and creator plans depend on an existing audience. An unverified X claim says several new meal planners hit US top-10 grossing in Food & Drink this summer (https://x.com/ski0xFF/status/2112212729813463072). Crowded. Assessment.",
    "lifecycle_evidence": "Mature niche with exits (Workweek Lunch acquired 2023, Mealime acquired by Albertsons and being shut down). Assessment.",
    "stream": "proven-model",
    "market": "US"
   }
  ],
  "distinct_people": 35,
  "distinct_people_note": "Counted from App Store/Play reviewer names, Reddit authors and X handles in the engagement field; no cross-platform dedup (not verified).",
  "weekly_counts": {
   "2026-W39": 3,
   "2026-W40": 11,
   "2026-W41": 8,
   "2026-W42": 11,
   "2026-W43": 4
  },
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 11,
   "last_week_iso": "2026-W41",
   "last_week": 8,
   "partial_week_W43": 4,
   "new_complaints_this_run": 13,
   "note": "US analyst 2026-10-24: counts by post_date over all linked complaints (scout windows 2026-09-22…2026-10-21 and 2026-09-24…2026-10-21); W43 (from Mon 19 Oct) is partial. Growth reflects nights of scouting, not the market."
  },
  "recurring": true,
  "recurring_note": "recurring=true if complaints fall in 3+ consecutive ISO weeks (by post_date). This pain: longest consecutive-week run 5. Scout runs that surfaced it: 2026-10-22, 2026-10-24.",
  "scores": {
   "frequency": 5,
   "intensity": 4,
   "willingness_to_pay": 4,
   "reachability": 3,
   "buildability": 3,
   "total": 19
  },
  "score_notes": {
   "frequency": "24 complaints tonight; the largest US thread is r/EatCheapAndHealthy 'Dinner is honestly the most stressful part of my day' (469 upvotes, 308 comments, c-034). Proven demand: Mealime had a dedicated subreddit and a petition (pm-us-20261022-01); Plan to Eat 'trusted by 50k+ meal planners'; Ollie 'more than 50,000 families'. 24 Oct: +13 complaints (Play/App Store reviews of the Albertsons and Safeway apps, r/mealime thread 'I miss the ingredient maximizing' 22 upvotes / 37 comments, c-076).",
   "intensity": "“I just exported 285 recipes but am really going to miss the simplicity of it all.” (c-029, 17 upvotes, 47 comments); “I JUST SPENT 20 MINUTES JUST TRYING TO GET THE THING TO LOAD INSTEAD OF PLANNING MY MEALS AND LIST. now I have no groceries or dinner for tonight.” (c-013). 24 Oct: “I spent over an hour last night budgeting different items and meal planning and building my cart, just for the app to crash this morning and delete ALL my items.” (c-066, https://apps.apple.com/us/app/id521487551#review-14674542375); “They shut down a perfectly good app that doesn’t require me to put in a store that’s across the country from me.” (c-065, https://apps.apple.com/us/app/id521487551#review-14695436066)",
   "willingness_to_pay": "Former payers: “Even the subscription fee was absolutely reasonable and... kind of the perfect price to remind me to use it, rather than make me dislike it in any way.” (c-041). Plan to Eat sells $5.95/mo or $49/yr with no free plan (plantoeat.com/pricing); Ollie $9.99/mo. Counter-signal: a user asks for a free one: “Does anybody know if there's a free app that helps you make a meal plan for the  week?” (c-035). 24 Oct: “Right now I pay $6/month for the one I have. I wouldn't want to spend more than probably $15-$20” (c-081, https://www.reddit.com/r/MealPrepSunday/comments/1wucza7/meal_plan_services_with_grocery_lists_and_prep/pd8wh6a/); Workweek Lunch had 4,000 active subscribers at $12/mo when acquired (pm-us-20261024-05, scout link).",
   "reachability": "r/mealime is reachable but saturated and hostile to pitches: “I've been looking for a Mealime alternative but everyone is posting their slop apps with clearly AI generated images in their marketing.” (c-030); “95% of them are \"only available on web for now\"” (c-040). Meta ads to US parents are possible (assessment).",
   "buildability": "Planner + combined list is a 2-week MVP; the hard part is a trustworthy recipe catalogue (Mealime's tested recipes), which a solo dev can't produce in 2 weeks; BYO recipes or a public-domain set would be needed (assessment).",
   "method": "First US run. Scores use US complaints and US proven models only. Re-scored 2026-10-24 (US analyst) with 13 new complaints and pm-us-20261024-05; total unchanged at 19."
  },
  "gates": {
   "consumer_subscription": {
    "result": "pass",
    "text": "pass (Plan to Eat and Ollie sell US subscriptions; Mealime had Pro)"
   },
   "simplest_way": {
    "result": "pass",
    "text": "pass (open app, tap 5 dinners, list is done)"
   },
   "us_entry": {
    "result": "pass",
    "text": "pass on mechanics (US subreddits, Meta ads, Paddle/Polar/Lemon Squeezy in USD) but the entry channel is flooded (see kill_reason)"
   }
  },
  "gate_failed": null,
  "competitor_veto": true,
  "kill_reason": "Killed by the competitor check, not by score. 20+ Mealime replacements in 30 days, free Meals Hub (Albertsons), Plan to Eat since 2008, Ollie ($7.5M seed) owns AI planning.",
  "borderline_note": "Near-miss: 19/25 (re-scored 24 Oct), all gates pass, killed only by the competitor veto (20+ fresh Mealime clones, free Meals Hub, Plan to Eat, creator meal plans). Recurs across both US scout runs (22 and 24 Oct).",
  "competitors": [
   {
    "name": "Plan to Eat",
    "url": "https://www.plantoeat.com/pricing",
    "price": "$5.95/month or $49/year (web); in-app yearly $54.99 and no monthly for new app subscribers per c-015",
    "price_source": "https://www.plantoeat.com/pricing",
    "loves": [
     {
      "quote": "I just switched to Plan to Eat, you do have to bring your own recipes but the planning features and shopping list are amazing, way better than Mealime.",
      "who": "u/UnseenJellyfish, r/mealime comment, 2026-10-08",
      "link": "https://www.reddit.com/r/mealime/comments/1x0im2m/non_ai_slop_app_alternatives/pelb296/"
     }
    ],
    "hates": [
     {
      "quote": "the advertised price is $49/year, or $5.95 a month, but when you try to subscribe it only offers an annual subscription for $54.99.",
      "who": "Play review 2026-10-12 (c-015)",
      "link": "https://play.google.com/store/apps/details?id=com.plantoeat.mobile&reviewId=17e0701b-01d5-402d-ba3f-f9d1f2153d92"
     }
    ],
    "funding": "Customer-funded, 'No investors' (plantoeat.com/about)"
   },
   {
    "name": "Meals Hub (Albertsons/Safeway/Vons apps; official Mealime successor)",
    "url": "https://getmealpot.com/mealime/replacement/",
    "price": "Free",
    "price_source": "https://getmealpot.com/mealime/shutting-down/",
    "loves": [
     {
      "quote": "Just download the Safeway app, the Mealime recipes are all there.",
      "who": "u/Artistic_Drummer_791, r/mealime comment, 2026-10-05",
      "link": "https://www.reddit.com/r/mealime/comments/1wwpehq/not_to_harp_on_mealime_shutting_down_but_help/pdwjegn/"
     }
    ],
    "hates": [
     {
      "quote": "The only thing I hate about it is that the grocery list feature sucks so I end up copy/pasting into the notes app",
      "who": "same comment (c-039)",
      "link": "https://www.reddit.com/r/mealime/comments/1wwpehq/not_to_harp_on_mealime_shutting_down_but_help/pdwjegn/"
     }
    ],
    "funding": "Albertsons Companies (NYSE: ACI)"
   },
   {
    "name": "eMeals",
    "url": "https://play.google.com/store/apps/details?id=com.emeals",
    "price": "Subscription (price not fetched tonight)",
    "price_source": null,
    "loves": [
     {
      "quote": "We LOVE the recipes and how easy it is to make a menu and shop the simple grocery list.",
      "who": "3★ Play review 2026-10-11",
      "link": "https://play.google.com/store/apps/details?id=com.emeals&reviewId=f06e10f4-31c9-4119-868e-0ed320a52aba"
     }
    ],
    "hates": [
     {
      "quote": "The convenience of the meal planning plus linking to your shopping cart is great, but it isn't worth the headache of the constant glitches and crashing.",
      "who": "c-012",
      "link": "https://play.google.com/store/apps/details?id=com.emeals&reviewId=2a681116-abd6-4988-9362-a6abd3a7615f"
     }
    ],
    "funding": "not checked"
   },
   {
    "name": "Samsung Food (ex-Whisk)",
    "url": "https://play.google.com/store/apps/details?id=com.foodient.whisk",
    "price": "Free with ads; Food+ $6.99–$59.99 IAP (Play listing); a reviewer saw $83/yr (c-017)",
    "price_source": "google-play-scraper app() tonight",
    "loves": [
     {
      "quote": "Does everything I want in a meal planning app.",
      "who": "3★ Play review 2026-10-18",
      "link": "https://play.google.com/store/apps/details?id=com.foodient.whisk&reviewId=44064944-c9d9-4b91-bc3b-5682573d963a"
     }
    ],
    "hates": [
     {
      "quote": "cannot use the recipe section while cooking, because ads LITERALLY take up 80% of screen space, even when moving to \"print mode.\"",
      "who": "c-016",
      "link": "https://play.google.com/store/apps/details?id=com.foodient.whisk&reviewId=da260a47-82d0-493e-a7a6-f5350ccd823c"
     }
    ],
    "funding": "Samsung"
   },
   {
    "name": "Ollie",
    "url": "https://techcrunch.com/2026/09/03/ollie-is-betting-privacy-can-win-the-ai-assistant-race/",
    "price": "$9.99/month (Press Herald 2025)",
    "price_source": "https://www.pressherald.com/2025/08/27/tired-of-meal-planning-or-nagging-your-spouse-outsource-it-to-a-machine/",
    "loves": [],
    "hates": [],
    "loves_hates_note": "No user reviews checked tonight.",
    "funding": "$7.5M seed led by Khosla Ventures (Sep 2026)"
   },
   {
    "name": "Workweek Lunch Pro",
    "url": "https://workweeklunch.com/weekly-meal-plans/",
    "price": "$12/month (scout link)",
    "price_source": "https://workweeklunch.com/weekly-meal-plans/",
    "loves": [],
    "hates": [],
    "funding": "Acquired by Mealprep on Fleek, 2023 (https://theygotacquired.com/content/workweek-lunch-acquired-by-mealprep-on-fleek/, scout link); user reviews not fetched tonight"
   }
  ],
  "gap": "Only a sliver: a non-AI-slop planner with tested recipes and a combined list for any store, which Flambette, WeeknightBite and Plan to Eat already claim.",
  "plc": {
   "stage": "maturity",
   "evidence": [
    "Category age: Plan to Eat since 2008 (https://www.plantoeat.com/about/story/); Mealime ~2016–2026.",
    "Competitors: 20+ new replacements in 30 days on r/mealime and X (see kill_reason), on top of Plan to Eat, Paprika, AnyList, Samsung Food, eMeals, Ollie.",
    "Recent funding/exits: Mealime shut down 21 Oct 2026 after Albertsons ownership (https://getmealpot.com/mealime/shutting-down/); Ollie $7.5M seed Sep 2026 (TechCrunch).",
    "Price trend: flat or down: official successor free; Plan to Eat $49/yr unchanged; apps pushing annual-only (c-015).",
    "Review/search trend: complaint spike around the shutdown date (Play reviews and r/mealime, 2026-09-24…10-21). Search trend not checked (no Google Trends access).",
    "24 Oct: exits in the content-plan niche too (Workweek Lunch acquired 2023, pm-us-20261024-05); unverified X claim that new meal planners reached US top-10 grossing Food & Drink this summer (https://x.com/ski0xFF/status/2112212729813463072) — not counted as evidence."
   ],
   "verdict": "maybe",
   "verdictText": "maybe (assessment): demand and willingness to pay are real, but in a mature category the wedge must be clear, and the obvious wedge was taken by 20+ entrants within a month.",
   "assessment": true
  },
  "verdict": "near-miss"
 },
 {
  "painId": "p-073",
  "night": "2026-10-22",
  "analyst_run": "2026-10-22-us-test",
  "market": "US",
  "niche": "meal planning & recipes",
  "name": "ReelRecipe",
  "label": null,
  "pitch": "Share a TikTok or Instagram recipe and get a clean card. Honest price, no trial trap.",
  "price": {
   "text": "$14.99/year or $19.99 one-time",
   "estimate": true
  },
  "mvp": "A share-sheet target: share a reel or URL, the app pulls caption, transcript and page schema and shows ingredients and steps in 3 seconds. Tap 'fix' on any line. One list of saved recipes.",
  "killQuestion": "Per-import AI/transcript cost above ~$0.02 at $15/yr; ReciMe dropping its 5-per-week cap; users really wanting one-time (Paprika exists); no TikTok distribution.",
  "description": "US users who save recipes from TikTok/Instagram/websites feel baited by recipe-import apps: 'free' apps that open with a 7-day trial and $40/yr, 5 imports a week, charges after cancelling, imports that miss ingredients, and paid sync that only works on one platform. Many say they'd pay once, not yearly. Second pass (24 Oct): RecipeBox and Pepper moved saved libraries behind subscriptions, Recipe Keeper charges each spouse separately, and NYT Cooking added AI recipes.",
  "who": "US home cooks who save recipes from social video, baited by 'free' apps that need a $40/yr trial",
  "source": "complaints+proven-model",
  "evidenceSummary": "ReciMe (15M users, #1 US Play Food & Drink grossing) draws 125 ≤3★ US Play reviews in 30 days over its 5-imports/week paywall and trial traps.",
  "complaint_ids": [
   "c-us-20261022-001",
   "c-us-20261022-002",
   "c-us-20261022-003",
   "c-us-20261022-004",
   "c-us-20261022-005",
   "c-us-20261022-006",
   "c-us-20261022-007",
   "c-us-20261022-008",
   "c-us-20261022-009",
   "c-us-20261022-010",
   "c-us-20261022-019",
   "c-us-20261022-022",
   "c-us-20261022-023",
   "c-us-20261022-024",
   "c-us-20261022-025",
   "c-us-20261022-028",
   "c-us-20261022-044",
   "c-us-20261024-063",
   "c-us-20261024-064",
   "c-us-20261024-068",
   "c-us-20261024-069",
   "c-us-20261024-070",
   "c-us-20261024-071",
   "c-us-20261024-072",
   "c-us-20261024-074",
   "c-us-20261024-075"
  ],
  "quotes": [
   {
    "id": "c-us-20261022-002",
    "found_date": "2026-10-22",
    "post_date": "2026-10-13",
    "source": "google_play ReciMe (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.recime.app&reviewId=51b57e52-c082-4df9-9cc8-89354eac2b3c",
    "quote": "I can only save 5 recipes and then I cant save more for another 7 days??? unless I pay to \"unlock the full experience\" 🙄🙄 goodness these subscriptions are so annoying",
    "engagement": "1★ review by 'Amber Manley', 2 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-004",
    "found_date": "2026-10-22",
    "post_date": "2026-10-02",
    "source": "google_play ReciMe (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.recime.app&reviewId=8e53d501-8997-418b-8100-9d68fcbfb722",
    "quote": "It should have a one time fee for like $19.99 but instead has an annual subscriptions.",
    "engagement": "1★ review by 'Keith Hennett', 1 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-001",
    "found_date": "2026-10-22",
    "post_date": "2026-10-18",
    "source": "google_play ReciMe (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.recime.app&reviewId=51b2a2f9-c286-4701-8561-acade1ab5867",
    "quote": "I have had them attempt to charge me several times since canceling (of which I have proof).",
    "engagement": "1★ review by 'Erin M', 3 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-072",
    "found_date": "2026-10-24",
    "post_date": "2026-10-20",
    "source": "app_store NYT Cooking (US storefront)",
    "link": "https://apps.apple.com/us/app/id911422904#review-14689209914",
    "quote": "Why on earth would I want AI to write the recipes when the whole reason I use NYT Cooking is for the amazing chefs and writers? Cancelled my membership, only using my cookbooks now.",
    "engagement": "1★ review by 'gabilovescheese', title: 'Awful AI inclusion'",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-023",
    "found_date": "2026-10-22",
    "post_date": "2026-10-19",
    "source": "google_play Recipe Keeper (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.tudorspan.recipekeeper&reviewId=1edd7097-6e81-4060-8b17-85521b75225e",
    "quote": "It wants me to add each little information of the recipe manually, a waste of time that deceives the purpose of the app.",
    "engagement": "3★ review by 'Cristina Albuquerque', 0 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-024",
    "found_date": "2026-10-22",
    "post_date": "2026-10-12",
    "source": "google_play Recipe Keeper (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.tudorspan.recipekeeper&reviewId=c12e29f9-950a-483c-b4e7-fe164ffe47c7",
    "quote": "Now I have to pay ANOTHER $30 to sync my phone to my laptop.",
    "engagement": "1★ review by 'Ash Reinbott', 0 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-028",
    "found_date": "2026-10-22",
    "post_date": "2026-10-12",
    "source": "google_play Flavorish (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=ai.flavorish.app&reviewId=da06808c-f491-4650-8afa-61470aeab6fc",
    "quote": "it's nice but way too expensive maybe $9.99 a year, if you had a one-time fee you would have a lot more people using your app.",
    "engagement": "3★ review by 'Dwayne McAuley', 0 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-064",
    "found_date": "2026-10-24",
    "post_date": "2026-10-10",
    "source": "google_play Honeydew (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.redhoney.eatlist&reviewId=ccc8ac69-f21e-494e-b3aa-d1598b032e48",
    "quote": "Downloaded the app because the description said $39.99/year. Without being able to even try the app, it wanted me to subscribe for over $80/year.",
    "engagement": "1★ review by 'Nicki McIlree', 1 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-006",
    "found_date": "2026-10-22",
    "post_date": "2026-10-09",
    "source": "google_play ReciMe (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.recime.app&reviewId=be1fe92d-8f2d-4be8-985f-ab968b2604dc",
    "quote": "my cooking goals are to have my recipes to hand where i can easily find and read them without scrolling all the way to the bottom of the page. that is it.",
    "engagement": "1★ review by 'ava wright', 0 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-007",
    "found_date": "2026-10-22",
    "post_date": "2026-10-06",
    "source": "google_play ReciMe (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.recime.app&reviewId=b2b230a2-afc6-44a9-9caa-45a17e0b2b3c",
    "quote": "I went to cancel my subscription in time and there was nothing showing as active on my Google play subscriptions but I was charged.",
    "engagement": "1★ review by 'ChAosAndArt7', 3 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-069",
    "found_date": "2026-10-24",
    "post_date": "2026-10-06",
    "source": "app_store RecipeBox (US storefront)",
    "link": "https://apps.apple.com/us/app/id1433840494#review-14635514770",
    "quote": "there’s no way to export the library you’ve built to another platform.",
    "engagement": "1★ review by 'xyzzy297', title: 'Beware - they switched to payfer!'",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-071",
    "found_date": "2026-10-24",
    "post_date": "2026-10-06",
    "source": "app_store Pepper (US storefront)",
    "link": "https://apps.apple.com/us/app/id1583947369#review-14636801445",
    "quote": "It costs $40 a year!!  If you don’t pay, all your recipes gone!",
    "engagement": "1★ review by 'Shirl PAZ', title: 'It Costs You'",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-044",
    "found_date": "2026-10-22",
    "post_date": "2026-10-03",
    "source": "x",
    "link": "https://x.com/jrxmey/status/2106388416703107337",
    "quote": "Why does every app have some type of subscription tier? I get it, the app costs money to uphold, but I'm not paying for a recipe app.",
    "engagement": "@jrxmey (location: Connecticut), 0 likes, 0 replies",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-063",
    "found_date": "2026-10-24",
    "post_date": "2026-10-03",
    "source": "google_play ReciMe (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.recime.app&reviewId=3a4f399d-8ee2-4b26-882a-d073d073f2e6",
    "quote": "you can save approximately 5 recipes before you need to wait for over a week to upload additional recipes.",
    "engagement": "1★ review by 'Tammie Lynn', 1 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-070",
    "found_date": "2026-10-24",
    "post_date": "2026-10-02",
    "source": "app_store RecipeBox (US storefront)",
    "link": "https://apps.apple.com/us/app/id1433840494#review-14620550544",
    "quote": "Now people who have had this app for multiple years are pigeonholed into subscribing to this app to keep our recipes.",
    "engagement": "1★ review by 'Cal Kestis IV', title: 'App is now Paid Subscription'",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-068",
    "found_date": "2026-10-24",
    "post_date": "2026-10-01",
    "source": "app_store RecipeBox (US storefront)",
    "link": "https://apps.apple.com/us/app/id1433840494#review-14616990168",
    "quote": "Now to access any of them I had to do a seven day free trial and then pay for a subscription.",
    "engagement": "1★ review by 'Kiki_Niff', title: 'No longer free'",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-003",
    "found_date": "2026-10-22",
    "post_date": "2026-09-30",
    "source": "google_play ReciMe (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.recime.app&reviewId=f273c5e3-db22-4daf-af9e-cd1902f7d6fb",
    "quote": "They sugarcoat it with it being a 7-Day free trial, but they're depending on people forgetting to cancel it and paying the $40 annual subscription.",
    "engagement": "1★ review by 'Christina Cleary', 1 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-019",
    "found_date": "2026-10-22",
    "post_date": "2026-09-30",
    "source": "google_play AnyList (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.purplecover.anylist&reviewId=b372ca5f-7857-4107-9901-c7e91e514a15",
    "quote": "The whole point of getting an app like this was so I DIDN'T have to copy and paste or write down ingredients and directions one by one.",
    "engagement": "1★ review by 'First name Last name', 1 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-025",
    "found_date": "2026-10-22",
    "post_date": "2026-09-29",
    "source": "google_play Stashcook (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.stashbox.stashcook&reviewId=65104f8b-e185-4642-b22b-5af64331205f",
    "quote": "another app that should be a one time purchase that is a subscription just to milk money out of you.",
    "engagement": "1★ review by 'Ryan Curran', 4 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-074",
    "found_date": "2026-10-24",
    "post_date": "2026-09-29",
    "source": "app_store Recipe Keeper (US storefront)",
    "link": "https://apps.apple.com/us/app/id974683711#review-14607723573",
    "quote": "me and my wife would have to have separate pro accounts just to share the same recipes because we are not using the same Apple ID.",
    "engagement": "1★ review by 'number156', title: 'Great app but…'",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-075",
    "found_date": "2026-10-24",
    "post_date": "2026-09-29",
    "source": "app_store Paprika 3 (US storefront)",
    "link": "https://apps.apple.com/us/app/id1303222868#review-14607102551",
    "quote": "I have a lot of family recipes written that I thought I could just take a picture of and store in this app. Apparently you cannot",
    "engagement": "2★ review by 'getting real annoyed', title: 'Family recipe'",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-010",
    "found_date": "2026-10-22",
    "post_date": "2026-09-26",
    "source": "google_play ReciMe (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.recime.app&reviewId=730a1629-5d8e-4c55-bf1b-608c34a7bc49",
    "quote": "now it only captures about half the recipe. not worth paying for, the free version is fine.",
    "engagement": "3★ review by 'trisa jones', 2 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-005",
    "found_date": "2026-10-22",
    "post_date": "2026-09-25",
    "source": "google_play ReciMe (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.recime.app&reviewId=0d9efdc7-0883-44e5-8d96-38245f359ac0",
    "quote": "Great idea but I'm TIRED of subscriptions.",
    "engagement": "1★ review by 'Karlene Brown', 1 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-008",
    "found_date": "2026-10-22",
    "post_date": "2026-09-25",
    "source": "google_play ReciMe (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.recime.app&reviewId=93179c62-e341-4925-8fff-284323320dbd",
    "quote": "I don't want to be tricked into downloading something then have it revealed it's not what it's claimed to be!!",
    "engagement": "2★ review by 'Lori Warner', 2 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-022",
    "found_date": "2026-10-22",
    "post_date": "2026-09-25",
    "source": "google_play NYT Cooking (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.nytimes.cooking&reviewId=a229e82f-8ae2-4130-a245-d68f8e748a0f",
    "quote": "I can't believe my $50 subscription went up to $260+ with no email notice.",
    "engagement": "1★ review by 'Aimee Benson', 0 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-009",
    "found_date": "2026-10-22",
    "post_date": "2026-09-24",
    "source": "google_play ReciMe (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.recime.app&reviewId=f6f3cadd-8603-472a-b017-657dc645a79b",
    "quote": "$40 a year when there are alternatives that are either free or offer a one time purchase is just ridiculous.",
    "engagement": "1★ review by 'Matthew Landers', 1 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   }
  ],
  "proven_models": [
   {
    "id": "pm-us-20261022-02",
    "found_date": "2026-10-22",
    "app": "ReciMe (save recipes from TikTok/Instagram/YouTube)",
    "country": "Australia (largest market US)",
    "model_and_price": "Freemium; free tier limited to 5 imports per 7 days (US Play reviews); ReciMe Plus annual $29.99–$59.99, commonly $39.99/yr (AppRank IAP list: https://apprank.io/recime-recipes-meal-planner-9280).",
    "traction_evidence": "'15 million users' in its own release notes (v8.1.x, Oct 2026, via AppRank/AppCurrents); 317,300 US App Store ratings (AppRank, 21 Oct 2026); 1,000,000+ Google Play installs, 111,543 ratings (google-play-scraper tonight); '#1 top grossing in food & drink on the US Google Play store' (LinkedIn post, Sep 2026: https://www.linkedin.com/posts/joana-rebelo-15947a25b_recime-grew-to-10-million-users-and-hit-1-activity-7501187413340319745-SuRX). Revenue is a third-party ESTIMATE only: AppRank ~$2.0M/month iOS (~$24M annualized); AppCurrents $530k–$2.9M/month (https://appcurrents.com/apps/recime-recipes-meal-planner-ios-1593779280). Funding: $500k pre-seed 2022 (https://www.startupdaily.net/topic/funding/recime-shared-recipes-cooking-app-menu-ideas/), seed 2024 with Marissa Mayer (per search synthesis, not opened).",
    "us_status": "Hated incumbent in the US: 10 of tonight's US Play complaints are ReciMe (5-imports-a-week paywall, 'advertised free' then 7-day trial, charges after cancelling, import misses half the recipe). Competitors: Honeydew (https://apps.apple.com/us/app/id6714449541), Flavorish (https://play.google.com/store/apps/details?id=ai.flavorish.app), Pestle, Crouton, Paprika 3 ($4.99 one-time, https://apps.apple.com/us/app/id1303222868), Samsung Food, Plan to Eat's Recipe Clipper (Instagram/TikTok import included, https://www.plantoeat.com/pricing).",
    "entry_point": "An honest importer: share a reel, get a clean recipe card, no trial trap, cheap annual or one-time price.",
    "why_not_done_yet": "Done many times: Paprika (one-time), Plan to Eat (clipper included), Flavorish, Honeydew, plus most Mealime clones import reels. ReciMe's growth came from TikTok distribution, not product uniqueness (LinkedIn post above). Video-to-recipe extraction has per-import AI/transcription cost and accuracy problems (users complain even about ReciMe's). Assessment.",
    "lifecycle_evidence": "Growth: ReciMe went from 10M users (Sep 2026, LinkedIn) to 15M (Oct 2026 release notes); many recent entrants (Honeydew, Flavorish, and most of the dozens of Mealime clones import reels). Price trend: subscriptions $30–60/yr, users pushing for one-time. Assessment.",
    "stream": "proven-model",
    "market": "US"
   }
  ],
  "distinct_people": 26,
  "distinct_people_note": "Counted from App Store/Play reviewer names, Reddit authors and X handles in the engagement field; no cross-platform dedup (not verified).",
  "weekly_counts": {
   "2026-W39": 5,
   "2026-W40": 10,
   "2026-W41": 5,
   "2026-W42": 4,
   "2026-W43": 2
  },
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 4,
   "last_week_iso": "2026-W41",
   "last_week": 5,
   "partial_week_W43": 2,
   "new_complaints_this_run": 9,
   "note": "US analyst 2026-10-24: counts by post_date over all linked complaints (scout windows 2026-09-22…2026-10-21 and 2026-09-24…2026-10-21); W43 (from Mon 19 Oct) is partial. Growth reflects nights of scouting, not the market."
  },
  "recurring": true,
  "recurring_note": "recurring=true if complaints fall in 3+ consecutive ISO weeks (by post_date). This pain: longest consecutive-week run 5. Scout runs that surfaced it: 2026-10-22, 2026-10-24.",
  "scores": {
   "frequency": 5,
   "intensity": 3,
   "willingness_to_pay": 3,
   "reachability": 3,
   "buildability": 3,
   "total": 17
  },
  "score_notes": {
   "frequency": "17 complaints (10 ReciMe); proven demand: ReciMe '15 million users', #1 US Play Food & Drink grossing, ~$2M/month iOS (third-party ESTIMATE, AppRank).",
   "intensity": "Annoyance more than pain: “Great idea but I'm TIRED of subscriptions.” (c-005); charges after cancelling (c-001, c-007) are the sharpest. 24 Oct: lock-in hurts more than price: “Now people who have had this app for multiple years are pigeonholed into subscribing to this app to keep our recipes.” (c-070, https://apps.apple.com/us/app/id1433840494#review-14620550544); “there’s no way to export the library you’ve built to another platform.” (c-069, https://apps.apple.com/us/app/id1433840494#review-14635514770)",
   "willingness_to_pay": "Mixed: ReciMe proves $30–60/yr sells, but complainers ask for one-time: “It should have a one time fee for like $19.99 but instead has an annual subscriptions.” (c-004); “I'm not paying for a recipe app.” (c-044, X, Connecticut). 24 Oct: “It costs $40 a year!!  If you don’t pay, all your recipes gone!” (c-071, https://apps.apple.com/us/app/id1583947369#review-14636801445); “Downloaded the app because the description said $39.99/year. Without being able to even try the app, it wanted me to subscribe for over $80/year.” (c-064, https://play.google.com/store/apps/details?id=com.redhoney.eatlist&reviewId=ccc8ac69-f21e-494e-b3aa-d1598b032e48)",
   "reachability": "ReciMe grew through TikTok creator accounts (LinkedIn post, pm-us-20261022-02), i.e. paid/creator distribution; no single US community to seed (assessment).",
   "buildability": "URL import with schema.org recipe parsing is easy; reel/video extraction needs captions/transcripts plus an LLM per import (cost, accuracy: c-010, c-023). Feasible but fragile in 2 weeks (assessment).",
   "method": "First US run. Re-scored 2026-10-24 (US analyst) with 9 new complaints; total unchanged at 17."
  },
  "gates": {
   "consumer_subscription": {
    "result": "weak-pass",
    "text": "weak pass (ReciMe sells annual; complainers prefer one-time)"
   },
   "simplest_way": {
    "result": "pass",
    "text": "pass (share a reel to the app, card appears)"
   },
   "us_entry": {
    "result": "pass",
    "text": "pass on mechanics; distribution depends on TikTok/creator marketing (assessment)"
   }
  },
  "gate_failed": null,
  "competitor_veto": false,
  "kill_reason": null,
  "borderline_note": "Near-miss at 17 (15–17 band; status changed from below-bar to near-miss under the current rule): big proven demand (ReciMe), but WTP leans one-time, lock-in anger is about incumbents, and video import is fragile for a 2-week build. Recurs across both US scout runs.",
  "competitors": [
   {
    "name": "ReciMe",
    "url": "https://apprank.io/recime-recipes-meal-planner-9280",
    "price": "Free (5 imports/week) + Plus $29.99–$59.99/yr, mostly $39.99",
    "price_source": "https://apprank.io/recime-recipes-meal-planner-9280",
    "loves": [
     {
      "quote": "the app worked great when I first downloaded it about a month ago.",
      "who": "3★ Play review 2026-09-26 (c-010)",
      "link": "https://play.google.com/store/apps/details?id=com.recime.app&reviewId=730a1629-5d8e-4c55-bf1b-608c34a7bc49"
     }
    ],
    "hates": [
     {
      "quote": "I can only save 5 recipes and then I cant save more for another 7 days??? unless I pay to \"unlock the full experience\" 🙄🙄 goodness these subscriptions are so annoying",
      "who": "c-002",
      "link": "https://play.google.com/store/apps/details?id=com.recime.app&reviewId=51b57e52-c082-4df9-9cc8-89354eac2b3c"
     },
     {
      "quote": "I have had them attempt to charge me several times since canceling (of which I have proof).",
      "who": "c-001",
      "link": "https://play.google.com/store/apps/details?id=com.recime.app&reviewId=51b2a2f9-c286-4701-8561-acade1ab5867"
     }
    ],
    "funding": "$500k pre-seed 2022; seed 2024 (search synthesis)"
   },
   {
    "name": "Paprika 3",
    "url": "https://apps.apple.com/us/app/id1303222868",
    "price": "$4.99 one-time (US App Store); Android IAP $4.99–$14.99",
    "price_source": "iTunes search / google-play-scraper tonight",
    "loves": [],
    "hates": [
     {
      "quote": "i regret spending money on this app. recipes disappear.",
      "who": "1★ Play review 2026-10-02",
      "link": "https://play.google.com/store/apps/details?id=com.hindsightlabs.paprika.android.v3&reviewId=8b3856b5-e3a2-4c0a-83d6-3362f012d42d"
     }
    ],
    "loves_hates_note": "54,099 US App Store ratings; no positive review pulled tonight.",
    "funding": "independent (not checked)"
   },
   {
    "name": "Plan to Eat (Recipe Clipper)",
    "url": "https://www.plantoeat.com/pricing",
    "price": "$49/yr incl. Instagram/TikTok/Pinterest import",
    "price_source": "https://www.plantoeat.com/pricing",
    "loves": [],
    "hates": [],
    "funding": "customer-funded"
   },
   {
    "name": "Flavorish",
    "url": "https://play.google.com/store/apps/details?id=ai.flavorish.app",
    "price": "~$50/yr per a reviewer (“they want 50 bucks a year”)",
    "price_source": "https://play.google.com/store/apps/details?id=ai.flavorish.app&reviewId=78e840c1-811b-4e16-846e-5e36a114afc7",
    "loves": [],
    "hates": [
     {
      "quote": "it's nice but way too expensive maybe $9.99 a year, if you had a one-time fee you would have a lot more people using your app.",
      "who": "c-028",
      "link": "https://play.google.com/store/apps/details?id=ai.flavorish.app&reviewId=da06808c-f491-4650-8afa-61470aeab6fc"
     }
    ],
    "funding": "not checked"
   },
   {
    "name": "Recipe Keeper",
    "url": "https://play.google.com/store/apps/details?id=com.tudorspan.recipekeeper",
    "price": "Paid sync per platform (~$30 per c-024)",
    "price_source": "https://play.google.com/store/apps/details?id=com.tudorspan.recipekeeper&reviewId=c12e29f9-950a-483c-b4e7-fe164ffe47c7",
    "loves": [],
    "hates": [
     {
      "quote": "It wants me to add each little information of the recipe manually, a waste of time that deceives the purpose of the app.",
      "who": "c-023",
      "link": "https://play.google.com/store/apps/details?id=com.tudorspan.recipekeeper&reviewId=1edd7097-6e81-4060-8b17-85521b75225e"
     }
    ],
    "funding": "indie (not checked)"
   }
  ],
  "gap": "An honest, cheap importer with no trial trap and a one-time or low annual price. Paprika ($4.99 one-time) and Plan to Eat already cover most of it; the remaining gap is reel import done well, which is a distribution game ReciMe is winning.",
  "plc": {
   "stage": "growth",
   "evidence": [
    "Category age: recipe managers are old (Paprika 3 on the US store with 54,099 ratings), but social-video import is new.",
    "Growth: ReciMe 10M users (Sep 2026, LinkedIn) → 15M (Oct 2026 release notes, AppRank/AppCurrents); #1 US Play Food & Drink grossing.",
    "Competitors rising: Honeydew, Flavorish, Pestle, Crouton, Samsung Food, and most new Mealime clones import reels.",
    "Price trend: $30–60/yr subscriptions; users push for one-time (c-004, c-009, c-025, c-028).",
    "Review trend: 125 ReciMe ≤3★ US Play reviews in 30 days (us/work/gp_raw.json). Search trend not checked.",
    "24 Oct: more paid-switch moves — RecipeBox went subscription-only (c-068, c-069, c-070), Pepper paywalled saved recipes (c-071), Honeydew listing shows $39.99/yr but asks >$80/yr (c-064)."
   ],
   "verdict": "maybe",
   "verdictText": "maybe (assessment): a growth market supports subscriptions, but the leader is funded and distribution-driven, and complainers want one-time pricing.",
   "assessment": true
  },
  "verdict": "near-miss"
 },
 {
  "painId": "p-074",
  "night": "2026-10-22",
  "analyst_run": "2026-10-22-us-test",
  "market": "US",
  "niche": "meal planning & recipes",
  "name": null,
  "label": "Shared grocery-list sync",
  "pitch": null,
  "price": null,
  "mvp": null,
  "killQuestion": null,
  "description": "Shared family grocery lists break: Out of Milk stopped syncing between household phones after an update, and OurGroceries shows ads disguised as items 'someone in your household added'. Second pass (24 Oct): Listonic auto-adds sponsored products to lists, and Out of Milk shows ads to people who bought Pro years ago.",
  "who": "US households sharing one grocery list (Play reviewers of Out of Milk, OurGroceries)",
  "source": "complaints",
  "evidenceSummary": "7 complaints from 7 people (Google Play 7).",
  "complaint_ids": [
   "c-us-20261022-020",
   "c-us-20261022-026",
   "c-us-20261022-027",
   "c-us-20261024-059",
   "c-us-20261024-060",
   "c-us-20261024-061",
   "c-us-20261024-062"
  ],
  "quotes": [
   {
    "id": "c-us-20261022-020",
    "found_date": "2026-10-22",
    "post_date": "2026-10-20",
    "source": "google_play OurGroceries (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.headcode.ourgroceries&reviewId=84371ca0-d9b3-457e-a925-96db418b5a53",
    "quote": "I'm not paying every month for a freaking list.",
    "engagement": "1★ review by 'Lance', 0 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-059",
    "found_date": "2026-10-24",
    "post_date": "2026-10-19",
    "source": "google_play Listonic (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.l&reviewId=b0f3cfd0-1b49-4a34-9b6c-2cf94e03e958",
    "quote": "four (4) bags of candy were added to the list by adclick.",
    "engagement": "1★ review by 'John Millett', 0 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-060",
    "found_date": "2026-10-24",
    "post_date": "2026-10-10",
    "source": "google_play Listonic (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.l&reviewId=7105c5b1-f854-4c94-9bd3-27ea2c43b739",
    "quote": "I also never appreciated having sponsored products automatically added to my shopping lists.",
    "engagement": "1★ review by 'Christine G', 1 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-027",
    "found_date": "2026-10-22",
    "post_date": "2026-10-06",
    "source": "google_play Out of Milk (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.capigami.outofmilk&reviewId=1a62e886-6d30-4f9f-87fd-620d621898d6",
    "quote": "It's very frustrating that she has to text me what she wants added to the list.",
    "engagement": "3★ review by 'Betsy O'Brien', 0 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-061",
    "found_date": "2026-10-24",
    "post_date": "2026-09-26",
    "source": "google_play Out of Milk (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.capigami.outofmilk&reviewId=d269097a-1431-4752-9f7e-cdd6840be7f7",
    "quote": "I have used this for at least a decade and recently it stopped syncing between my list and my spouse's.",
    "engagement": "2★ review by 'Sarah Campbell', 0 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-062",
    "found_date": "2026-10-24",
    "post_date": "2026-09-26",
    "source": "google_play Out of Milk (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.capigami.outofmilk&reviewId=5cb3b180-d926-4453-8e89-e9e55f1253fc",
    "quote": "I've suddenly started getting annoying ads even though I paid for the pro version years ago.",
    "engagement": "1★ review by 'A Google user', 2 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-026",
    "found_date": "2026-10-22",
    "post_date": "2026-09-23",
    "source": "google_play Out of Milk (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.capigami.outofmilk&reviewId=ca84e57a-8c48-461c-9a7a-12d3cf94eea4",
    "quote": "Neither of us sees the additions or changes the other makes to our shared list.",
    "engagement": "2★ review by 'Phil Kaehler', 0 thumbs up",
    "niche": "meal planning & recipes",
    "stream": "problem",
    "market": "US"
   }
  ],
  "proven_models": [],
  "distinct_people": 7,
  "distinct_people_note": "Counted from App Store/Play reviewer names, Reddit authors and X handles in the engagement field; no cross-platform dedup (not verified).",
  "weekly_counts": {
   "2026-W39": 3,
   "2026-W41": 2,
   "2026-W43": 2
  },
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 0,
   "last_week_iso": "2026-W41",
   "last_week": 2,
   "partial_week_W43": 2,
   "new_complaints_this_run": 4,
   "note": "US analyst 2026-10-24: counts by post_date over all linked complaints (scout windows 2026-09-22…2026-10-21 and 2026-09-24…2026-10-21); W43 (from Mon 19 Oct) is partial. Growth reflects nights of scouting, not the market."
  },
  "recurring": false,
  "recurring_note": "recurring=true if complaints fall in 3+ consecutive ISO weeks (by post_date). This pain: longest consecutive-week run 1. Scout runs that surfaced it: 2026-10-22, 2026-10-24.",
  "scores": {
   "frequency": 2,
   "intensity": 3,
   "willingness_to_pay": 2,
   "reachability": 3,
   "buildability": 4,
   "total": 14
  },
  "score_notes": {
   "frequency": "3 kept (Out of Milk had 22 low reviews in 30 days, mostly sync). 24 Oct: +4 (7 total across two runs).",
   "intensity": "“It's very frustrating that she has to text me what she wants added to the list.” (c-027). 24 Oct: “four (4) bags of candy were added to the list by adclick.” (c-059, https://play.google.com/store/apps/details?id=com.l&reviewId=b0f3cfd0-1b49-4a34-9b6c-2cf94e03e958); “I have used this for at least a decade and recently it stopped syncing between my list and my spouse's.” (c-061, https://play.google.com/store/apps/details?id=com.capigami.outofmilk&reviewId=d269097a-1431-4752-9f7e-cdd6840be7f7)",
   "willingness_to_pay": "“I'm not paying every month for a freaking list.” (c-020). AnyList already shares lists free and sells Complete at $9.99/yr or $14.99/yr per household (https://www.anylist.com/features).",
   "reachability": "Play reviews only.",
   "buildability": "Real-time shared list is doable; AnyList and Apple/Google free lists exist (assessment).",
   "method": "First US run. Re-scored 2026-10-24: unchanged at 14."
  },
  "gates": {
   "consumer_subscription": {
    "result": "fail",
    "text": "fail: users refuse to pay monthly for a list (c-020 from 22 Oct) and AnyList's free sharing covers the job"
   },
   "simplest_way": {
    "result": "pass",
    "text": "pass"
   },
   "us_entry": {
    "result": "not-assessed",
    "text": "not assessed (below bar)"
   }
  },
  "gate_failed": "consumer_subscription",
  "competitor_veto": false,
  "kill_reason": null,
  "borderline_note": null,
  "competitors": [
   {
    "name": "AnyList",
    "url": "https://play.google.com/store/apps/details?id=com.purplecover.anylist",
    "price": "IAP $9.99–$14.99 (Play listing)",
    "price_source": "google-play-scraper app() tonight",
    "loves": [],
    "hates": [],
    "loves_hates_note": "4.85★ from 30,895 Play ratings; not researched further (below bar).",
    "funding": "indie (not checked)"
   }
  ],
  "gap": null,
  "plc": null,
  "verdict": "below-bar"
 },
 {
  "painId": "p-075",
  "night": "2026-10-22",
  "analyst_run": "2026-10-22-us-test",
  "market": "US",
  "niche": "car owners",
  "name": null,
  "label": "OEM remote-start subscriptions",
  "pitch": null,
  "price": null,
  "mvp": null,
  "killQuestion": null,
  "description": "US car owners are angry that remote start, lock/unlock and maps in the OEM apps (Toyota, GM/OnStar, Ford, Subaru) stop working after a free trial unless they pay $15/month or ~$145–150/year.",
  "who": "Owners of recent Toyota, Chevrolet/GMC, Ford, Subaru and Mazda vehicles in the US (Play reviews, r/Toyota, r/subaru, r/mazda, X users in PA/NH/UT/IN)",
  "source": "complaints",
  "evidenceSummary": "16 complaints from 16 people (Google Play 8, X 4, Reddit 4).",
  "complaint_ids": [
   "c-us-20261022-049",
   "c-us-20261022-050",
   "c-us-20261022-051",
   "c-us-20261022-052",
   "c-us-20261022-053",
   "c-us-20261022-054",
   "c-us-20261022-055",
   "c-us-20261022-056",
   "c-us-20261022-063",
   "c-us-20261022-064",
   "c-us-20261022-065",
   "c-us-20261022-066",
   "c-us-20261022-067",
   "c-us-20261022-068",
   "c-us-20261022-069",
   "c-us-20261022-070"
  ],
  "quotes": [
   {
    "id": "c-us-20261022-054",
    "found_date": "2026-10-22",
    "post_date": "2026-10-21",
    "source": "google_play Toyota (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.toyota.oneapp&reviewId=3a5d03e3-19e7-4f39-9e65-035366d9ea6e",
    "quote": "Having to pay $15 a month for remote start is a rip off.",
    "engagement": "1★ review by 'Tyler', 0 thumbs up",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-068",
    "found_date": "2026-10-22",
    "post_date": "2026-10-21",
    "source": "x",
    "link": "https://x.com/UpgradeGitmo/status/2113009532003606802",
    "quote": "now manufacturers make you pay a subscription to use them in your own car...",
    "engagement": "@UpgradeGitmo (location: Lakes Region, NH, USA), 0 likes, 0 replies",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-065",
    "found_date": "2026-10-22",
    "post_date": "2026-10-20",
    "source": "reddit r/mazda",
    "link": "https://www.reddit.com/r/mazda/comments/1xb4alw/can_we_really_hope_to_keep_our_car_forever/",
    "quote": "So with the garbage state of new cars today (telematics, eye tracking, data selling, subscription features, etc), i dont think i WANT to buy a new car.",
    "engagement": "1 upvotes, 0 comments (archive snapshot), u/derpmcturd",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-067",
    "found_date": "2026-10-22",
    "post_date": "2026-10-19",
    "source": "x",
    "link": "https://x.com/tishtosh_/status/2112320541264949657",
    "quote": "tried to remote start my car this morning and my free subscription expired. it’s $145 to renew",
    "engagement": "@tishtosh_ (location: Philadelphia, PA), 0 likes, 0 replies",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-053",
    "found_date": "2026-10-22",
    "post_date": "2026-10-16",
    "source": "google_play Ford (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.ford.fordpass&reviewId=138a3a88-05a8-4477-b8d2-46e9abad35fd",
    "quote": "remote start only available on and expensive app when it was on your keychain for the last 20 years.",
    "engagement": "1★ review by 'done gone', 0 thumbs up",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-066",
    "found_date": "2026-10-22",
    "post_date": "2026-10-16",
    "source": "reddit r/Toyota",
    "link": "https://www.reddit.com/r/Toyota/comments/1x7lomg/toyota_connect_limitations/",
    "quote": "Am I missing something or is the Toyota Connect as lame as it appears based on my experience?",
    "engagement": "0 upvotes, 2 comments (archive snapshot), u/bruco13",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-069",
    "found_date": "2026-10-22",
    "post_date": "2026-10-14",
    "source": "x",
    "link": "https://x.com/ericjallsop/status/2110426418702364672",
    "quote": "Onstar is 30 per month and really just is a remote start feature.",
    "engagement": "@ericjallsop (location: St George, UT), 1 likes, 0 replies",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-063",
    "found_date": "2026-10-22",
    "post_date": "2026-10-13",
    "source": "reddit r/Toyota",
    "link": "https://www.reddit.com/r/Toyota/comments/1x4wbc6/wtf/",
    "quote": "Why in the shit do I have to pay a subscription to have auto start on a 50K vehicle, this is beyond greedy",
    "engagement": "163 upvotes, 112 comments (archive snapshot), u/smnutting",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-064",
    "found_date": "2026-10-22",
    "post_date": "2026-10-12",
    "source": "reddit r/subaru",
    "link": "https://www.reddit.com/r/subaru/comments/1x46g6m/my_subaru_connected_services/",
    "quote": "Getting emails to renew for $149.95 for both for a year.",
    "engagement": "4 upvotes, 3 comments (archive snapshot), u/BigBadBere",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-070",
    "found_date": "2026-10-22",
    "post_date": "2026-10-06",
    "source": "x",
    "link": "https://x.com/PaulZurbrugg/status/2107509770944983456",
    "quote": "I bet when the heated seats or remote start they charge a monthly fee to use stop working, they won't cover the repair costs",
    "engagement": "@PaulZurbrugg (location: Fort Wayne, IN), 1 likes, 0 replies",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-051",
    "found_date": "2026-10-22",
    "post_date": "2026-10-03",
    "source": "google_play myChevrolet (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.gm.chevrolet.nomad.ownership&reviewId=6dbc28a1-f141-43d7-965b-3f89f10cadf0",
    "quote": "I shouldn't have to require a subscription to operate a car I own.",
    "engagement": "1★ review by 'Ryan Wright', 1 thumbs up",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-050",
    "found_date": "2026-10-22",
    "post_date": "2026-10-02",
    "source": "google_play myChevrolet (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.gm.chevrolet.nomad.ownership&reviewId=e5dbbfee-93b8-4d36-8288-9681b443b035",
    "quote": "15/month or 150/yr for something I use seldomly...no thanks.",
    "engagement": "1★ review by 'Kenneth Martz', 1 thumbs up",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-056",
    "found_date": "2026-10-22",
    "post_date": "2026-10-02",
    "source": "google_play Toyota (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.toyota.oneapp&reviewId=cbf392f4-b466-4c2a-a7be-77293b8a4268",
    "quote": "I am debating just buying an after market auto starter",
    "engagement": "3★ review by 'Ken K', 0 thumbs up",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-049",
    "found_date": "2026-10-22",
    "post_date": "2026-10-01",
    "source": "google_play myChevrolet (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.gm.chevrolet.nomad.ownership&reviewId=d706e7fc-b5fe-4c4c-8bec-cbd9589a4af6",
    "quote": "All usefulness is gone after the 30 day Onstar trial, and I'm not going to pay a subscription to get remote start, lock, or unlock.",
    "engagement": "1★ review by 'William “Bill” Miano', 6 thumbs up",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-055",
    "found_date": "2026-10-22",
    "post_date": "2026-09-25",
    "source": "google_play Toyota (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.toyota.oneapp&reviewId=5262328d-7158-4747-9147-14bde7a4eec0",
    "quote": "NO ONE told me that the remote start and all the features were a paid subscription.",
    "engagement": "1★ review by 'Patricia Culley', 1 thumbs up",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-052",
    "found_date": "2026-10-22",
    "post_date": "2026-09-24",
    "source": "google_play myGMC (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.gm.gmc.nomad.ownership&reviewId=1b96d328-7956-4f1d-825a-a49a946d80c4",
    "quote": "this app used to be great but now without paid subscription it locks you out from the map or remote starts...this is getting ridiculous",
    "engagement": "1★ review by 'M. E.', 1 thumbs up",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   }
  ],
  "proven_models": [],
  "distinct_people": 16,
  "distinct_people_note": "Counted from Play reviewer names, Reddit authors and X handles in the engagement field; no cross-platform dedup (not verified).",
  "weekly_counts": {
   "2026-W39": 2,
   "2026-W40": 4,
   "2026-W41": 1,
   "2026-W42": 5,
   "2026-W43": 4
  },
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 5,
   "last_week_iso": "2026-W41",
   "last_week": 1,
   "partial_week_W43": 4,
   "note": "US one-off run 2026-10-22: counts by post_date over the 30-day window (2026-09-22…2026-10-21); W43 (from Mon 19 Oct) is partial. One run only, so growth reflects this run's scouting, not the market."
  },
  "recurring": true,
  "recurring_note": "recurring=true if complaints fall in 3+ consecutive ISO weeks (by post_date). This pain: longest consecutive-week run 5; first US run, so the 'later run' rule cannot apply yet.",
  "scores": {
   "frequency": 5,
   "intensity": 4,
   "willingness_to_pay": 1,
   "reachability": 3,
   "buildability": 1,
   "total": 14
  },
  "score_notes": {
   "frequency": "16 kept; OEM apps had 171 (Toyota), 172 (Ford), 141 (myChevrolet), 41 (myGMC) ≤3★ US Play reviews in 30 days; r/Toyota rant 163 upvotes / 112 comments (c-063).",
   "intensity": "“I shouldn't have to require a subscription to operate a car I own.” (c-051).",
   "willingness_to_pay": "The complaint is about paying at all: “15/month or 150/yr for something I use seldomly...no thanks.” (c-050).",
   "reachability": "Brand subreddits and forums, but nothing to sell into them.",
   "buildability": "Needs OEM telematics access (closed APIs/servers) or hardware; the real alternative is an aftermarket remote starter (“I am debating just buying an after market auto starter”, c-056). Not a software MVP.",
   "method": "First US run."
  },
  "gates": {
   "consumer_subscription": {
    "result": "fail",
    "text": "fail (users reject a subscription for this)"
   },
   "simplest_way": {
    "result": "not-assessed",
    "text": "n/a"
   },
   "us_entry": {
    "result": "not-assessed",
    "text": "n/a"
   }
  },
  "gate_failed": "buildability / consumer_subscription",
  "competitor_veto": false,
  "kill_reason": null,
  "borderline_note": null,
  "competitors": [],
  "gap": "Hardware/OEM-locked; not a software opportunity for Judi.",
  "plc": null,
  "verdict": "below-bar"
 },
 {
  "painId": "p-076",
  "night": "2026-10-22",
  "analyst_run": "2026-10-22-us-test",
  "market": "US",
  "niche": "car owners",
  "name": "DueCheck",
  "label": null,
  "pitch": "Enter your mileage and see what's due on your car. Free export, no subscription creep.",
  "price": {
   "text": "$1.99/month or $14.99/year (likely unsellable against free CARFAX)",
   "estimate": true
  },
  "mvp": "Pick your car, enter today's odometer, and get a list of what's due (oil, tires, filters) with one tap to log 'done'. Reminders by mileage estimate. CSV export always free.",
  "killQuestion": "CARFAX Car Care is free and fills itself from shop records, and reviewers refuse subscriptions for logging.",
  "description": "Long-time users of car maintenance/expense loggers feel pushed out: Drivvo moved data export behind premium, aCar turned into a subscription grab after the Fuelly buyout, Simply Auto's paid cloud sync fails, and people can't find a decent replacement tracker.",
  "who": "US DIY car owners whose long-used loggers moved features behind paywalls or broke sync",
  "source": "complaints+proven-model",
  "evidenceSummary": "5 US Play reviews (Drivvo, aCar, Simply Auto, FIXD) plus proven model Drivvo (Brazil, 5M+ Play installs).",
  "complaint_ids": [
   "c-us-20261022-057",
   "c-us-20261022-058",
   "c-us-20261022-059",
   "c-us-20261022-060",
   "c-us-20261022-061"
  ],
  "quotes": [
   {
    "id": "c-us-20261022-058",
    "found_date": "2026-10-22",
    "post_date": "2026-10-12",
    "source": "google_play aCar (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.zonewalker.acar&reviewId=8d9b6595-6472-4b18-b9d2-e5caa017a4f1",
    "quote": "Fuelly buyout has led to this money grab for subscriptions.",
    "engagement": "1★ review by 'Bradley Poelstra', 21 thumbs up",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-059",
    "found_date": "2026-10-22",
    "post_date": "2026-10-03",
    "source": "google_play Simply Auto (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=mrigapps.andriod.fuelcons&reviewId=5c37796f-29aa-48cf-8165-f73091be78c0",
    "quote": "I love that I can track everything about my maintenance. UNFORTUNATELY, the cloud sync simply doesn't work.",
    "engagement": "2★ review by 'Timothy Valis', 19 thumbs up",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-057",
    "found_date": "2026-10-22",
    "post_date": "2026-10-10",
    "source": "google_play Drivvo (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=br.com.ctncardoso.ctncar&reviewId=75f3902c-a49d-4616-8001-00b8b0e41753",
    "quote": "Their response is that data export is now a premium feature. That completely misses the point!",
    "engagement": "1★ review by 'Homam', 0 thumbs up",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-061",
    "found_date": "2026-10-22",
    "post_date": "2026-10-14",
    "source": "google_play FIXD (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.fixdapp.two&reviewId=912f1572-8bf7-47aa-a582-3a55f44150bf",
    "quote": "I had to navigate 10 separate cancellation screens before the subscription was actually confirmed as cancelled.",
    "engagement": "1★ review by 'Lets Rock', 0 thumbs up",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-060",
    "found_date": "2026-10-22",
    "post_date": "2026-10-06",
    "source": "google_play Vehicle Maintenance Tracker (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.jake.vehiclemaintenancetracker&reviewId=bc38842b-aae3-4e00-9e3c-c6901aedac10",
    "quote": "This is the best option I can find to replace an old maintenance tracker that I used for years that eventually went obsolete, but I still find it lacking.",
    "engagement": "3★ review by 'Jessica', 0 thumbs up",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   }
  ],
  "proven_models": [
   {
    "id": "pm-us-20261022-05",
    "found_date": "2026-10-22",
    "app": "Drivvo (car expense & maintenance log)",
    "country": "Brazil",
    "model_and_price": "Freemium with ads; Pro via in-app purchase ($2.00–$400.00 per item on US Play listing, google-play-scraper tonight). Data export recently moved to premium (US Play review 2026-10-10).",
    "traction_evidence": "5,000,000+ Google Play installs, 4.35★ from 115,660 ratings (google-play-scraper tonight, https://play.google.com/store/apps/details?id=br.com.ctncardoso.ctncar); 977 US App Store ratings (iTunes search). No revenue figure found.",
    "us_status": "Strong free US incumbent: CARFAX Car Care (free, auto-pulls service records; 1,000,000+ Play installs, 4.73★ from 42,553 ratings; 128,158 US App Store ratings) https://play.google.com/store/apps/details?id=com.carfax.mycarfax . Others: Simply Auto, Fuelly/aCar (US users angry after the 'Fuelly buyout'), Vehicle Maintenance Tracker. US reviewers want one-time or free.",
    "entry_point": "A simple 'what's due on my car' reminder with free export, for users leaving enshittified loggers.",
    "why_not_done_yet": "It is done, for free, by CARFAX Car Care, which also auto-imports shop records; willingness to pay a subscription is low (assessment).",
    "lifecycle_evidence": "Maturity: apps a decade old ('Used this app for 10 years', Drivvo review), consolidation (Fuelly bought aCar per review), price trend = moving free features behind paywalls. Assessment.",
    "stream": "proven-model",
    "market": "US"
   }
  ],
  "distinct_people": 5,
  "distinct_people_note": "Counted from Play reviewer names, Reddit authors and X handles in the engagement field; no cross-platform dedup (not verified).",
  "weekly_counts": {
   "2026-W40": 1,
   "2026-W41": 2,
   "2026-W42": 2
  },
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 2,
   "last_week_iso": "2026-W41",
   "last_week": 2,
   "partial_week_W43": 0,
   "note": "US one-off run 2026-10-22: counts by post_date over the 30-day window (2026-09-22…2026-10-21); W43 (from Mon 19 Oct) is partial. One run only, so growth reflects this run's scouting, not the market."
  },
  "recurring": true,
  "recurring_note": "recurring=true if complaints fall in 3+ consecutive ISO weeks (by post_date). This pain: longest consecutive-week run 3; first US run, so the 'later run' rule cannot apply yet.",
  "scores": {
   "frequency": 3,
   "intensity": 3,
   "willingness_to_pay": 2,
   "reachability": 3,
   "buildability": 5,
   "total": 16
  },
  "score_notes": {
   "frequency": "5 kept (aCar review 21 thumbs up, Simply Auto 19 thumbs up); proven demand: Drivvo 5M+ installs; CARFAX Car Care 1M+ installs, 128,158 US App Store ratings.",
   "intensity": "“I love that I can track everything about my maintenance. UNFORTUNATELY, the cloud sync simply doesn't work.” (c-059).",
   "willingness_to_pay": "They paid once (Simply Auto Pro, aCar Pro key) and resent subscriptions: “Fuelly buyout has led to this money grab for subscriptions.” (c-058). Free CARFAX Car Care caps the price (assessment).",
   "reachability": "r/Cartalk (e.g. 'Rate my maintenance log' post) and brand subs; low intent.",
   "buildability": "A reminder + log + CSV export is a classic 2-week MVP.",
   "method": "First US run."
  },
  "gates": {
   "consumer_subscription": {
    "result": "fail",
    "text": "fail (users want free or one-time; free CARFAX Car Care)"
   },
   "simplest_way": {
    "result": "pass",
    "text": "pass (enter mileage, see what's due)"
   },
   "us_entry": {
    "result": "pass",
    "text": "pass on mechanics"
   }
  },
  "gate_failed": "consumer_subscription",
  "competitor_veto": false,
  "kill_reason": null,
  "borderline_note": "Near-miss at 16: very buildable, but fails the subscription gate (one-time/free expectation) and CARFAX Car Care is free.",
  "competitors": [
   {
    "name": "CARFAX Car Care",
    "url": "https://play.google.com/store/apps/details?id=com.carfax.mycarfax",
    "price": "Free",
    "price_source": "Play listing (google-play-scraper app() tonight)",
    "loves": [],
    "hates": [],
    "loves_hates_note": "4.73★ from 42,553 Play ratings; only 4 ≤3★ reviews in 30 days, none about the core job.",
    "funding": "CARFAX (corporate)"
   },
   {
    "name": "Drivvo",
    "url": "https://play.google.com/store/apps/details?id=br.com.ctncardoso.ctncar",
    "price": "Free with ads; Pro IAP $2–$400 range (Play listing)",
    "price_source": "google-play-scraper",
    "loves": [],
    "hates": [
     {
      "quote": "Their response is that data export is now a premium feature. That completely misses the point!",
      "who": "c-057",
      "link": "https://play.google.com/store/apps/details?id=br.com.ctncardoso.ctncar&reviewId=75f3902c-a49d-4616-8001-00b8b0e41753"
     }
    ],
    "funding": "not checked"
   },
   {
    "name": "Simply Auto",
    "url": "https://play.google.com/store/apps/details?id=mrigapps.andriod.fuelcons",
    "price": "IAP $1.49–$29.99",
    "price_source": "google-play-scraper",
    "loves": [
     {
      "quote": "I love that I can track everything about my maintenance.",
      "who": "c-059",
      "link": "https://play.google.com/store/apps/details?id=mrigapps.andriod.fuelcons&reviewId=5c37796f-29aa-48cf-8165-f73091be78c0"
     }
    ],
    "hates": [
     {
      "quote": "UNFORTUNATELY, the cloud sync simply doesn't work.",
      "who": "c-059",
      "link": "https://play.google.com/store/apps/details?id=mrigapps.andriod.fuelcons&reviewId=5c37796f-29aa-48cf-8165-f73091be78c0"
     }
    ],
    "funding": "indie (not checked)"
   }
  ],
  "gap": "A no-nonsense logger with free export; but a funded free leader (CARFAX Car Care, auto-imports shop records) sets the price at $0.",
  "plc": {
   "stage": "maturity",
   "evidence": [
    "Category age: 10+ years (“Used this app for 10 years”, Drivvo review in us/work/gp_raw.json).",
    "Consolidation: aCar reviewers blame the 'Fuelly buyout' (c-058).",
    "Price trend: free features moving behind paywalls (c-057, c-058).",
    "Free funded leader: CARFAX Car Care, 1M+ installs.",
    "Search trend not checked."
   ],
   "verdict": "no",
   "verdictText": "no (assessment): mature, free leader, and users reject subscriptions for logging.",
   "assessment": true
  },
  "verdict": "near-miss"
 },
 {
  "painId": "p-077",
  "night": "2026-10-22",
  "analyst_run": "2026-10-22-us-test",
  "market": "US",
  "niche": "car owners",
  "name": null,
  "label": "Parking & gas payment apps",
  "pitch": null,
  "price": null,
  "mvp": null,
  "killQuestion": null,
  "description": "US drivers are pushed into subscriptions or high fees by payment apps they can't avoid: ParkMobile blocks login unless you start a free trial, PayByPhone adds ~50% convenience fees, GasBuddy deals don't apply.",
  "who": "US drivers paying for city parking and gas via apps",
  "source": "complaints",
  "evidenceSummary": "5 complaints from 5 people (Google Play 5).",
  "complaint_ids": [
   "c-us-20261022-045",
   "c-us-20261022-046",
   "c-us-20261022-047",
   "c-us-20261022-048",
   "c-us-20261022-062"
  ],
  "quotes": [
   {
    "id": "c-us-20261022-045",
    "found_date": "2026-10-22",
    "post_date": "2026-10-17",
    "source": "google_play ParkMobile (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=net.sharewire.parkmobilev2&reviewId=d3401490-05c5-4b0b-9dde-c2e51a4bd340",
    "quote": "They've added some subscription to the process, and if I don't select \"start free trial\" I can't login.",
    "engagement": "1★ review by 'John Hines', 1 thumbs up",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-046",
    "found_date": "2026-10-22",
    "post_date": "2026-10-11",
    "source": "google_play ParkMobile (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=net.sharewire.parkmobilev2&reviewId=d04b24cd-a708-4691-af84-b39c3c631312",
    "quote": "this app will not let me log in without signing up for a subscription, which should be illegal since it's used to access municipal services.",
    "engagement": "1★ review by 'matthew saindon', 0 thumbs up",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-047",
    "found_date": "2026-10-22",
    "post_date": "2026-10-11",
    "source": "google_play ParkMobile (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=net.sharewire.parkmobilev2&reviewId=4229728b-f932-4517-8deb-a8e301564e54",
    "quote": "why is there no audible alarm setting in here when your parking is about to run out?",
    "engagement": "1★ review by 'Jeff S', 0 thumbs up",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-048",
    "found_date": "2026-10-22",
    "post_date": "2026-10-08",
    "source": "google_play PayByPhone (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.paybyphone&reviewId=50586a4c-fd15-424d-8c1d-2e3c6cbd89ea",
    "quote": "Convenience fee is 50% of the parking cost. Then there is another $0.30 SMS fee.",
    "engagement": "1★ review by 'Udo Schneider', 1 thumbs up",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261022-062",
    "found_date": "2026-10-22",
    "post_date": "2026-09-24",
    "source": "google_play GasBuddy (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=gbis.gbandroid&reviewId=5049dbe0-38cf-4f76-b657-3f0138ed4fa5",
    "quote": "the supposed 'Flash Deal' stations don't actually give you a discount.",
    "engagement": "2★ review by 'A Google user', 0 thumbs up",
    "niche": "car owners",
    "stream": "problem",
    "market": "US"
   }
  ],
  "proven_models": [],
  "distinct_people": 5,
  "distinct_people_note": "Counted from Play reviewer names, Reddit authors and X handles in the engagement field; no cross-platform dedup (not verified).",
  "weekly_counts": {
   "2026-W39": 1,
   "2026-W41": 3,
   "2026-W42": 1
  },
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 1,
   "last_week_iso": "2026-W41",
   "last_week": 3,
   "partial_week_W43": 0,
   "note": "US one-off run 2026-10-22: counts by post_date over the 30-day window (2026-09-22…2026-10-21); W43 (from Mon 19 Oct) is partial. One run only, so growth reflects this run's scouting, not the market."
  },
  "recurring": false,
  "recurring_note": "recurring=true if complaints fall in 3+ consecutive ISO weeks (by post_date). This pain: longest consecutive-week run 2; first US run, so the 'later run' rule cannot apply yet.",
  "scores": {
   "frequency": 3,
   "intensity": 4,
   "willingness_to_pay": 1,
   "reachability": 2,
   "buildability": 1,
   "total": 11
  },
  "score_notes": {
   "frequency": "5 kept (ParkMobile 49 ≤3★ in 30 days).",
   "intensity": "“this app will not let me log in without signing up for a subscription, which should be illegal since it's used to access municipal services.” (c-046).",
   "willingness_to_pay": "They want to pay less, not more (c-048).",
   "reachability": "Diffuse.",
   "buildability": "Needs city/operator payment integrations; not buildable.",
   "method": "First US run."
  },
  "gates": {
   "consumer_subscription": {
    "result": "fail",
    "text": "fail"
   },
   "simplest_way": {
    "result": "not-assessed",
    "text": "n/a"
   },
   "us_entry": {
    "result": "not-assessed",
    "text": "n/a"
   }
  },
  "gate_failed": "buildability",
  "competitor_veto": false,
  "kill_reason": null,
  "borderline_note": null,
  "competitors": [],
  "gap": "Not a solo-dev opportunity.",
  "plc": null,
  "verdict": "below-bar"
 },
 {
  "painId": "p-078",
  "night": "2026-10-23",
  "analyst_run": "2026-10-23-us",
  "market": "US",
  "niche": "home fitness & workout logging",
  "name": null,
  "label": "Lift-logger paywalls",
  "pitch": null,
  "price": null,
  "mvp": null,
  "killQuestion": null,
  "description": "US lifters who just want a simple set/rep/weight log with a rest timer are being pushed into subscriptions: StrongLifts retired its old Power Pack and went Pro-only (~$60/yr), Strong/JEFIT/Alpha Progression gate templates, routines and graphs, and many ask for a one-time $10–20 price instead.",
  "who": "US gym and home-gym lifters who log barbell/dumbbell workouts (US App Store and Play reviewers of StrongLifts, Strong, JEFIT, Alpha Progression, Apple Fitness; r/Hevy, r/xxfitness, X)",
  "source": "complaints+proven-model",
  "evidenceSummary": "StrongLifts went Pro-only (~$60/yr); 25 people in 30 days, many asking for a $10–20 one-time price.",
  "complaint_ids": [
   "c-us-20261023-036",
   "c-us-20261023-039",
   "c-us-20261023-047",
   "c-us-20261023-048",
   "c-us-20261023-049",
   "c-us-20261023-050",
   "c-us-20261023-051",
   "c-us-20261023-052",
   "c-us-20261023-055",
   "c-us-20261023-062",
   "c-us-20261023-063",
   "c-us-20261023-069",
   "c-us-20261023-070",
   "c-us-20261023-071",
   "c-us-20261023-072",
   "c-us-20261023-073",
   "c-us-20261023-074",
   "c-us-20261023-075",
   "c-us-20261023-076",
   "c-us-20261023-079",
   "c-us-20261023-080",
   "c-us-20261023-086",
   "c-us-20261023-087",
   "c-us-20261023-088",
   "c-us-20261023-090"
  ],
  "quotes": [
   {
    "id": "c-us-20261023-070",
    "found_date": "2026-10-23",
    "post_date": "2026-09-23",
    "source": "app_store StrongLifts (US storefront)",
    "link": "https://apps.apple.com/us/app/id488580022#review-14585564509",
    "quote": "Give me a $10 or $20 one time payment and I’ll bite. We don’t need a subscription for everything.",
    "engagement": "1★ review by 'Steven2491', title: 'Long time user switching to another app'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-073",
    "found_date": "2026-10-23",
    "post_date": "2026-10-03",
    "source": "app_store StrongLifts (US storefront)",
    "link": "https://apps.apple.com/us/app/id488580022#review-14624635128",
    "quote": "The new version no longer honors this purchase and paywalls you to a $60.00 a year minimum subscription.",
    "engagement": "1★ review by 'PlaidShadow', title: 'Lifetime unlock not honored - Subscription now required'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-079",
    "found_date": "2026-10-23",
    "post_date": "2026-10-14",
    "source": "reddit r/Hevy",
    "link": "https://www.reddit.com/r/Hevy/comments/1x5qt9q/thinking_of_buying_hevy_lifetime_pro_after_1_year/",
    "quote": "I’m considering Lifetime because I’d prefer a one-time payment over recurring subscriptions.",
    "engagement": "58 upvotes, 70 comments (archive snapshot), u/atharva0720",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-039",
    "found_date": "2026-10-23",
    "post_date": "2026-10-21",
    "source": "google_play JEFIT (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=je.fit&reviewId=f1964787-1b24-4cfc-9124-6ed2889f2365",
    "quote": "i have 30 routines & was looking to add more. Jefit will not allow me to add any more routines.",
    "engagement": "1★ review by 'Issa Williams', 0 thumbs up",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-047",
    "found_date": "2026-10-23",
    "post_date": "2026-10-21",
    "source": "google_play StrongLifts (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.stronglifts.app&reviewId=12d1e07c-e04b-4ca3-be4e-ed2a8285cf85",
    "quote": "You can no longer just use the timer for free, and they want an obscene amount of money for it.",
    "engagement": "1★ review by 'Michael Houser', 0 thumbs up",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-062",
    "found_date": "2026-10-23",
    "post_date": "2026-10-20",
    "source": "app_store JEFIT (US storefront)",
    "link": "https://apps.apple.com/us/app/id449810000#review-14691377250",
    "quote": "this app has made me just use my phone for music and notepad to track my workout.",
    "engagement": "2★ review by 'TheRealAlvector', title: 'Not what it used to be'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-086",
    "found_date": "2026-10-23",
    "post_date": "2026-10-14",
    "source": "reddit r/Hevy (comment)",
    "link": "https://www.reddit.com/r/Hevy/comments/1x5qt9q/thinking_of_buying_hevy_lifetime_pro_after_1_year/pgr9fvc/",
    "quote": "I hate paying monthly for anything.",
    "engagement": "1 upvotes (archive snapshot), u/Original-March-3540",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-087",
    "found_date": "2026-10-23",
    "post_date": "2026-10-14",
    "source": "reddit r/Hevy (comment)",
    "link": "https://www.reddit.com/r/Hevy/comments/1x5qt9q/thinking_of_buying_hevy_lifetime_pro_after_1_year/pgoolo0/",
    "quote": "For me, I'd rather pay a one-time fee than have to auto-renew constantly.",
    "engagement": "15 upvotes (archive snapshot), u/Limp-Audience-7313",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-088",
    "found_date": "2026-10-23",
    "post_date": "2026-10-14",
    "source": "reddit r/Hevy (comment)",
    "link": "https://www.reddit.com/r/Hevy/comments/1x5qt9q/thinking_of_buying_hevy_lifetime_pro_after_1_year/pgontvv/",
    "quote": "I would NEVER NEVER pay for the lifetime version after I got burnt with a couple other apps that stalled",
    "engagement": "-1 upvotes (archive snapshot), u/bimmerfeller",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-048",
    "found_date": "2026-10-23",
    "post_date": "2026-10-09",
    "source": "google_play StrongLifts (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.stronglifts.app&reviewId=6acdaf48-4ea2-43d9-8e79-5bf9bb39a148",
    "quote": "i just need a timer and a set count. i don't want to pay 60$ for that.",
    "engagement": "1★ review by 'Andre Josue', 1 thumbs up",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-080",
    "found_date": "2026-10-23",
    "post_date": "2026-10-09",
    "source": "reddit r/Hevy",
    "link": "https://www.reddit.com/r/Hevy/comments/1x1pc51/is_there_an_open_source_available_yet/",
    "quote": "I am looking to eliminate all of my subscriptions",
    "engagement": "0 upvotes, 5 comments (archive snapshot), u/Technical-Fee-7377",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-071",
    "found_date": "2026-10-23",
    "post_date": "2026-10-07",
    "source": "app_store StrongLifts (US storefront)",
    "link": "https://apps.apple.com/us/app/id488580022#review-14639882633",
    "quote": "For a glorified spreadsheet? No, thank you.",
    "engagement": "1★ review by 'El Darth Frank', title: 'Another Subscription'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-036",
    "found_date": "2026-10-23",
    "post_date": "2026-10-04",
    "source": "google_play Strong (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=io.strongapp.strong&reviewId=844a0f45-fa6e-49d6-b2e9-d46e3e466442",
    "quote": "limits you to only 3 custom templates which is awful, so you have to get the pro subscription which costs wayyy too much, just use 'hevy' it's free and it's better.",
    "engagement": "2★ review by 'Tan', 0 thumbs up",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-049",
    "found_date": "2026-10-23",
    "post_date": "2026-10-01",
    "source": "google_play StrongLifts (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.stronglifts.app&reviewId=8a780ea2-f9cb-4519-a36f-30ec9cd07ec9",
    "quote": "I'm willing to pay for the premium version but I think there should be a free version that allows you to track your workouts at the very least.",
    "engagement": "2★ review by 'Jon K', 8 thumbs up",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-050",
    "found_date": "2026-10-23",
    "post_date": "2026-10-01",
    "source": "google_play StrongLifts (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.stronglifts.app&reviewId=7313e1a7-2c2b-4f12-b97f-3c42717abb4f",
    "quote": "all the features that the Power Pack unlocked are now locked behind a subscription (currently $60/year).",
    "engagement": "1★ review by 'Will C', 1 thumbs up",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-055",
    "found_date": "2026-10-23",
    "post_date": "2026-09-30",
    "source": "app_store Strong (US storefront)",
    "link": "https://apps.apple.com/us/app/id464254577#review-14613344308",
    "quote": "I’m also annoyed at the paywall, which removes the most basic features such as graphs.",
    "engagement": "3★ review by 'FedexDeliveryDriver', title: 'Huge Potential, Huge Shortcomings'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-069",
    "found_date": "2026-10-23",
    "post_date": "2026-09-29",
    "source": "app_store StrongLifts (US storefront)",
    "link": "https://apps.apple.com/us/app/id488580022#review-14609411218",
    "quote": "It is a flashy front end for a locally stored spreadsheet not an advanced cloud service. This should be a $10-20 one time purchase + $5 IAP for watch support at most for what is offered.",
    "engagement": "1★ review by 'casecadet', title: 'Stay away'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-074",
    "found_date": "2026-10-23",
    "post_date": "2026-09-29",
    "source": "app_store StrongLifts (US storefront)",
    "link": "https://apps.apple.com/us/app/id488580022#review-14608295494",
    "quote": "I bought the app because it just simply tracks lifts. It’s not worth a monthly subscription.",
    "engagement": "1★ review by 'Marebarebeans', title: 'Bait and switch operation'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-052",
    "found_date": "2026-10-23",
    "post_date": "2026-09-27",
    "source": "google_play Alpha Progression (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.alphaprogression.alphaprogression&reviewId=062d8c3f-2c98-4429-8a50-82bc7c77e4cc",
    "quote": "All it's supposed to do is have a catalog of exercises that allows us to make a plan with a timer that lets you know that it's time to start your next set!",
    "engagement": "1★ review by 'Lane Allen', 9 thumbs up",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-063",
    "found_date": "2026-10-23",
    "post_date": "2026-09-26",
    "source": "app_store JEFIT (US storefront)",
    "link": "https://apps.apple.com/us/app/id449810000#review-14596875118",
    "quote": "It is no longer the simple logging app that it used to be.",
    "engagement": "1★ review by 'Covertbanana', title: 'Full of AI bloat'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-072",
    "found_date": "2026-10-23",
    "post_date": "2026-09-26",
    "source": "app_store StrongLifts (US storefront)",
    "link": "https://apps.apple.com/us/app/id488580022#review-14596692421",
    "quote": "app now forces you to choose a subscription plan with no way to access basic features anymore or export years of data tracked.",
    "engagement": "1★ review by 'H. Mr. C', title: 'No free option anymore'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-090",
    "found_date": "2026-10-23",
    "post_date": "2026-09-25",
    "source": "x",
    "link": "https://x.com/bardlebeelzebub/status/2103456679564067018",
    "quote": "I wish I didn’t have to add all of the details of a work out into the fitness app every time I need to input one.",
    "engagement": "@bardlebeelzebub (location: 🇺🇸), 0 likes, 1 replies",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-075",
    "found_date": "2026-10-23",
    "post_date": "2026-09-24",
    "source": "app_store Apple Fitness (US storefront)",
    "link": "https://apps.apple.com/us/app/id1208224953#review-14587917061",
    "quote": "Simply log that you did “strength training for 1 hour.” More details? Notes? Logs? Leg day? Splits? How much weight? Hit a PR?",
    "engagement": "1★ review by 'jjjjjjdjdjdjdjdjdjdjdjdjdjdj', title: 'The most barebones app imaginable'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-051",
    "found_date": "2026-10-23",
    "post_date": "2026-09-23",
    "source": "google_play StrongLifts (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.stronglifts.app&reviewId=9df47f79-44b7-44ef-9e87-c54ea2a5d85d",
    "quote": "Adding a new payment requirement to an existing purchase after the fact is another.",
    "engagement": "1★ review by 'Jeremy Mann', 4 thumbs up",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-076",
    "found_date": "2026-10-23",
    "post_date": "2026-09-23",
    "source": "reddit r/xxfitness",
    "link": "https://www.reddit.com/r/xxfitness/comments/1wo8ig8/how_do_people_get_past_week_three/",
    "quote": "I stop opening the spreadsheet because the empty cells stress me out",
    "engagement": "36 upvotes, 81 comments (archive snapshot), u/FIG098",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   }
  ],
  "proven_models": [
   {
    "id": "pm-us-20261023-01",
    "found_date": "2026-10-23",
    "app": "StrongLifts 5x5 (simple barbell lift log)",
    "country": "Belgium (founder Mehdi Hadim; not re-verified tonight)",
    "model_and_price": "Was freemium + one-time 'Power Pack' / lifetime unlock; now subscription-only Pro, about $60/year (support article updated 7 Oct 2026: https://support.stronglifts.com/article/188-power-pack; US reviews quote '$60/year').",
    "traction_evidence": "Google Play 1,000,000+ installs, ~101k ratings; 76,867 US App Store ratings (google-play-scraper / iTunes lookup tonight). 52 low US App Store reviews and dozens of 1-star Google Play reviews since 23 Sep, nearly all about the subscription switch. No revenue figure found.",
    "us_status": "Large US user base now angry. Alternatives exist: Hevy (free, $75 lifetime), Strong, Liftosaur (free/open), plus several indie 'pay-once 5x5' apps that devs are already pitching on r/Stronglifts5x5 and X (Maintenea, lift, RepDay).",
    "entry_point": "A pay-once ($10–20) or very cheap barbell-program logger with free CSV import from StrongLifts and Apple Watch, aimed at people leaving after the subscription switch. US complaints: https://apps.apple.com/us/app/id488580022#review-14609411218 , https://apps.apple.com/us/app/id488580022#review-14585564509 , https://play.google.com/store/apps/details?id=com.stronglifts.app&reviewId=7313e1a7-2c2b-4f12-b97f-3c42717abb4f",
    "why_not_done_yet": "It is being done right now: several indie clones launched in the last weeks and Hevy/Liftosaur are free. Users ask for one-time pricing, which does not fit a subscription business (assessment). Competitor veto is likely.",
    "lifecycle_evidence": "Mature, now in the monetisation-squeeze phase: the incumbent moved from lifetime to subscription in 2025–26 and churn is visible in reviews. Assessment.",
    "stream": "proven-model",
    "market": "US"
   },
   {
    "id": "pm-us-20261023-05",
    "found_date": "2026-10-23",
    "app": "Hevy (workout log + social)",
    "country": "Spain",
    "model_and_price": "Freemium: generous free log; Pro about $2.99/month, $23.99/year, or $74.99 lifetime (prices per Reddit/r/Hevy tonight, not checked in app).",
    "traction_evidence": "17M+ users (https://www.hevyapp.com/about-us/); founder-reported $160K MRR in 2024 and ~$800K MRR estimate (https://www.systemaic.com/teardowns/hevy, estimate).",
    "us_status": "Already big in the US and the default switch target for StrongLifts/Strong/Fitbod refugees. US users praise lifetime pricing: https://www.reddit.com/r/Hevy/comments/1x5qt9q/thinking_of_buying_hevy_lifetime_pro_after_1_year/pgoolo0/ ; some say it feels like a log, not a program: https://apps.apple.com/us/app/id1458862350#review-14685012129",
    "entry_point": "Proof that a cheap, free-first lift logger with lifetime pricing wins. Possible gap: programming on top of Hevy-style logging, but Hevy is adding routines/coaching itself.",
    "why_not_done_yet": "Done; Hevy is the cheap leader, so a new lift logger competes on price with an incumbent that is almost free (assessment). Competitor veto.",
    "lifecycle_evidence": "Growth: fast user growth, low price, taking share from older loggers. Assessment.",
    "stream": "proven-model",
    "market": "US"
   }
  ],
  "distinct_people": 25,
  "distinct_people_note": "Counted from App Store/Play reviewer names, Reddit authors and X handles in the engagement field; no cross-platform dedup (not verified).",
  "weekly_counts": {
   "2026-W39": 8,
   "2026-W40": 7,
   "2026-W41": 3,
   "2026-W42": 4,
   "2026-W43": 3
  },
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 4,
   "last_week_iso": "2026-W41",
   "last_week": 3,
   "partial_week_W43": 3,
   "note": "US analyst 2026-10-23: counts by post_date over the scout's 30-day window (2026-09-23…2026-10-21); W43 (from Mon 19 Oct) is partial. First US run for these niches (home maintenance, home fitness), so week-over-week growth reflects one night's scouting, not the market."
  },
  "recurring": true,
  "recurring_note": "recurring=true if complaints fall in 3+ consecutive ISO weeks (by post_date). This pain: longest consecutive-week run 5; first US run for this niche, so no earlier-run comparison exists yet.",
  "scores": {
   "frequency": 5,
   "intensity": 4,
   "willingness_to_pay": 2,
   "reachability": 4,
   "buildability": 5,
   "total": 20
  },
  "score_notes": {
   "frequency": "25 complaints, the biggest US cluster tonight; StrongLifts alone has 76,862 US App Store ratings (iTunes lookup) and the scout counted 52 low US App Store reviews since 23 Sep (pm-us-20261023-01). r/Hevy lifetime thread 58 upvotes / 70 comments (c-079).",
   "intensity": "Felt as a betrayal of a past purchase: “Adding a new payment requirement to an existing purchase after the fact is another.” (c-051); “app now forces you to choose a subscription plan with no way to access basic features anymore or export years of data tracked.” (c-072).",
   "willingness_to_pay": "They will pay, but once: “Give me a $10 or $20 one time payment and I’ll bite.” (c-070); “I'd rather pay a one-time fee than have to auto-renew constantly.” (c-087). Hevy Pro is ~$23.99/yr per scout. A subscription is the thing this cluster is rejecting.",
   "reachability": "Concentrated: r/Stronglifts5x5, r/Hevy, r/fitness; App Store keyword 'stronglifts alternative' (assessment). Indie devs are already pitching there on X (Maintenea, RepDay).",
   "buildability": "Set/rep/weight log + timer + CSV import is a 2-week MVP; Apple Watch sync is the hard bit (Hevy's own reviews complain about it).",
   "method": "US analyst run 2026-10-23. Scores use US complaints and US proven models only."
  },
  "gates": {
   "consumer_subscription": {
    "result": "borderline",
    "text": "borderline pass: Hevy Pro and Strong Pro prove US lifters pay recurring (“So good I paid the $29 for the yearly”, Strong review), but this cluster explicitly asks for one-time pricing (c-069, c-070, c-079, c-087)"
   },
   "simplest_way": {
    "result": "pass",
    "text": "pass (open app, today's sets prefilled, tap done)"
   },
   "us_entry": {
    "result": "pass",
    "text": "pass on mechanics (r/Stronglifts5x5, App Store search, Paddle/Polar/Lemon Squeezy in USD)"
   }
  },
  "gate_failed": null,
  "competitor_veto": true,
  "kill_reason": "Competitor veto (score 20). Hevy free, no ads, 99,319 US ratings at 4.92★; Strong free tier; Boostcamp no paywall; Liftosaur free; Oct 2026 indie pay-once launches (Maintenea, RepDay).",
  "borderline_note": "Highest score tonight (20) but killed only by the competitor veto; the cluster wants one-time pricing.",
  "competitors": [
   {
    "name": "Hevy",
    "url": "https://apps.apple.com/us/app/id1458862350",
    "price": "Free; Pro ~$2.99/mo, $23.99/yr, $74.99 lifetime (scout, from r/Hevy; not checked in app)",
    "price_source": "https://www.reddit.com/r/Hevy/comments/1x5qt9q/thinking_of_buying_hevy_lifetime_pro_after_1_year/pgoolo0/",
    "loves": [
     {
      "quote": "It’s amazing that this app is free and has no ads, I can believe everyone doesn’t use it!",
      "who": "5★ US App Store review by srhal",
      "link": "https://apps.apple.com/us/app/id1458862350#review-14691755704"
     },
     {
      "quote": "I haven’t paid for the optional subscription a day in my life, but it’s completely non mandatory for a satisfying experience overall.",
      "who": "5★ US App Store review by Scored92",
      "link": "https://apps.apple.com/us/app/id1458862350#review-14691468097"
     }
    ],
    "hates": [
     {
      "quote": "Syncing with the Apple Watch is a disaster and rarely works now.",
      "who": "1★ US App Store review 'A mess now'",
      "link": "https://apps.apple.com/us/app/id1458862350#review-14681266918"
     },
     {
      "quote": "that you can only have 4 workouts saved at time before you have to pay.",
      "who": "3★ Play review",
      "link": "https://play.google.com/store/apps/details?id=com.hevy&reviewId=707eb95a-b3fc-48eb-8624-d2f65c7457db"
     }
    ],
    "funding": "Bootstrapped/indie per scout notes (not checked tonight); founder-reported $160K MRR in 2024 (pm-us-20261023-05, third-party)"
   },
   {
    "name": "Strong",
    "url": "https://apps.apple.com/us/app/id464254577",
    "price": "Free ('Strong Accounts are Free Forever'); Pro yearly ~$29 per a reviewer",
    "price_source": "https://www.strong.app/",
    "loves": [
     {
      "quote": "So good I paid the $29 for the yearly with hesitation after using the free one for a free days.",
      "who": "5★ US App Store review by Swill282",
      "link": "https://apps.apple.com/us/app/id464254577#review-14612889519"
     },
     {
      "quote": "No AI BS just straight to the point",
      "who": "5★ US App Store review title by Florida Jit 26",
      "link": "https://apps.apple.com/us/app/id464254577#review-14483511646"
     }
    ],
    "hates": [
     {
      "quote": "I’m also annoyed at the paywall, which removes the most basic features such as graphs.",
      "who": "3★ US App Store review (c-055)",
      "link": "https://apps.apple.com/us/app/id464254577#review-14613344308"
     },
     {
      "quote": "limits you to only 3 custom templates which is awful, so you have to get the pro subscription which costs wayyy too much, just use 'hevy' it's free and it's better.",
      "who": "2★ Play review (c-036)",
      "link": "https://play.google.com/store/apps/details?id=io.strongapp.strong&reviewId=844a0f45-fa6e-49d6-b2e9-d46e3e466442"
     }
    ],
    "funding": "not checked"
   },
   {
    "name": "StrongLifts 5x5",
    "url": "https://apps.apple.com/us/app/id488580022",
    "price": "Pro only since 2025, ~$60/yr (reviews); ex-Power Pack users get 50% off first year",
    "price_source": "https://support.stronglifts.com/article/188-power-pack",
    "loves": [],
    "loves_hates_note": "76,862 US App Store ratings at 4.86★ (iTunes lookup), but recent reviews are dominated by the switch.",
    "hates": [
     {
      "quote": "The new version no longer honors this purchase and paywalls you to a $60.00 a year minimum subscription.",
      "who": "1★ US App Store review (c-073)",
      "link": "https://apps.apple.com/us/app/id488580022#review-14624635128"
     }
    ],
    "funding": "indie (not checked)"
   },
   {
    "name": "Boostcamp",
    "url": "https://www.boostcamp.app/",
    "price": "Free programs; Pro for Auto Progression",
    "price_source": "https://www.boostcamp.app/",
    "loves": [
     {
      "quote": "The free features are better than most paid apps.",
      "who": "5★ US App Store review by Drew Cooley",
      "link": "https://apps.apple.com/us/app/id1529354455#review-14657911915"
     }
    ],
    "hates": [
     {
      "quote": "most of my logged numbers from that workout are lost.",
      "who": "1★ US App Store review 'Latest update has made this unusable'",
      "link": "https://apps.apple.com/us/app/id1529354455#review-14669557830"
     }
    ],
    "funding": "not checked"
   },
   {
    "name": "Liftosaur",
    "url": "https://www.liftosaur.com/",
    "price": "Free plan; paid subscription/lifetime (a reviewer quotes “$70-100 on lifetime”)",
    "price_source": "https://www.liftosaur.com/",
    "loves": [
     {
      "quote": "Best of all, it’s free! I definitely recommend it!",
      "who": "App Store review quoted on liftosaur.com",
      "link": "https://www.liftosaur.com/"
     }
    ],
    "hates": [
     {
      "quote": "Notifications of rest ending don't work unless the screen is on and you have the app open.",
      "who": "2★ Play review",
      "link": "https://play.google.com/store/apps/details?id=com.liftosaur.www.twa&reviewId=d8bf4a0b-0d7e-46df-8cbc-7e29f2006977"
     }
    ],
    "funding": "solo developer (site)"
   },
   {
    "name": "Maintenea / RepDay (indie launches, Oct 2026)",
    "url": "https://x.com/i/status/2110490811389612337",
    "price": "Maintenea free ('No Pro tier, no ads'); RepDay one-time £29.99",
    "price_source": "https://x.com/i/status/2110712367680209405",
    "loves": [],
    "hates": [],
    "loves_hates_note": "Launch posts only; no user reviews.",
    "funding": "indie"
   }
  ],
  "gap": "Only 'pay once, import my StrongLifts history' — and that gap is a one-time purchase, not a subscription, already served by Hevy lifetime, Liftosaur and October indie launches.",
  "plc": {
   "stage": "maturity",
   "evidence": [
    "Category age: Strong on the US App Store since 2011-09-15 and StrongLifts since 2011-12-22 (iTunes lookup, us/work/analyst-2026-10-23/lookup_*.json).",
    "Competitor count/trend: Hevy (2019, 99,319 US ratings), Strong (108,536), Boostcamp (10,640), Liftosaur (2023, 425), Gymverse, StrengthLog, JEFIT, plus new Oct 2026 indie launches (Maintenea, RepDay on X).",
    "Price trend: monetisation squeeze — StrongLifts 'Since 2025 : Pro only. No free tier.' (support.stronglifts.com/article/188-power-pack); StrengthLog/Gymverse/Hevy limiting free routines (Play reviews in us/work/2026-10-23/gp_raw.json) — while the free leaders stay free.",
    "Review trend: 52 low US App Store StrongLifts reviews since 23 Sep (scout); Hevy's recent US reviews are overwhelmingly 5★ (rss_1458862350.json). Search trend not checked (no Google Trends access)."
   ],
   "verdict": "maybe",
   "verdictText": "maybe→no (assessment): mature with free leaders; the only wedge (one-time price) does not support a subscription.",
   "assessment": true,
   "trendTo": "no"
  },
  "verdict": "near-miss"
 },
 {
  "painId": "p-079",
  "night": "2026-10-23",
  "analyst_run": "2026-10-23-us",
  "market": "US",
  "niche": "home fitness & workout logging",
  "name": null,
  "label": "AI workout planners that repeat",
  "pitch": null,
  "price": null,
  "mvp": null,
  "killQuestion": null,
  "description": "US users of AI/coached workout planners (Fitbod, SHRED, Hevy as a 'program') feel the plans are repetitive or don't adapt to their equipment and time off, while prices are $15.99/mo–$179.99/yr; some already replace them with ChatGPT/Claude.",
  "who": "US gym-goers and home-gym owners who want to be told what to do today (US App Store/Play reviewers of Fitbod, SHRED, Hevy; r/fitbod; X)",
  "source": "complaints+proven-model",
  "evidenceSummary": "Fitbod/SHRED users say plans repeat or ignore settings; proven model Ladder (#2 US Health & Fitness top-grossing, via the scout).",
  "complaint_ids": [
   "c-us-20261023-037",
   "c-us-20261023-038",
   "c-us-20261023-053",
   "c-us-20261023-056",
   "c-us-20261023-057",
   "c-us-20261023-058",
   "c-us-20261023-059",
   "c-us-20261023-060",
   "c-us-20261023-061",
   "c-us-20261023-077",
   "c-us-20261023-078",
   "c-us-20261023-089",
   "c-us-20261023-091"
  ],
  "quotes": [
   {
    "id": "c-us-20261023-056",
    "found_date": "2026-10-23",
    "post_date": "2026-10-19",
    "source": "app_store Hevy (US storefront)",
    "link": "https://apps.apple.com/us/app/id1458862350#review-14685012129",
    "quote": "My biggest complaint is that Hevy feels more like a workout log than an actual training program.",
    "engagement": "3★ review by 'Timdwill', title: 'Great Workout Tracker, but Falls Short on Training Guidance'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-078",
    "found_date": "2026-10-23",
    "post_date": "2026-10-19",
    "source": "reddit r/fitbod",
    "link": "https://www.reddit.com/r/fitbod/comments/1x9gmk0/any_plans_for_fitbod_to_support_claude_or_chatgpt/",
    "quote": "I’d much rather be able to connect Claude or ChatGPT directly to my Fitbod data",
    "engagement": "0 upvotes, 16 comments (archive snapshot), u/JBskierbum",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-037",
    "found_date": "2026-10-23",
    "post_date": "2026-10-18",
    "source": "google_play Fitbod (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.fitbod.fitbod&reviewId=84f8a77f-4e13-4def-901c-b56475495584",
    "quote": "had me sit and sign up and create a plan for 30 minutes then revealed i had to pay $120 a year",
    "engagement": "1★ review by 'zazzle777i', 1 thumbs up",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-057",
    "found_date": "2026-10-23",
    "post_date": "2026-10-18",
    "source": "app_store Fitbod (US storefront)",
    "link": "https://apps.apple.com/us/app/id1041517543#review-14683265369",
    "quote": "When it ended, my card was automatically charged $179.99.",
    "engagement": "1★ review by 'Sonya MNH', title: 'Subscription rates change'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-058",
    "found_date": "2026-10-23",
    "post_date": "2026-10-13",
    "source": "app_store Fitbod (US storefront)",
    "link": "https://apps.apple.com/us/app/id1041517543#review-14663218493",
    "quote": "I'm shocked the app expects me to lower the weights myself after time off.",
    "engagement": "1★ review by 'whagsol', title: 'I want so badly to like this app'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-077",
    "found_date": "2026-10-23",
    "post_date": "2026-10-12",
    "source": "reddit r/fitbod",
    "link": "https://www.reddit.com/r/fitbod/comments/1x47yx6/previously_satisfied_customer/",
    "quote": "it's giving me the same 10 exercises no matter what setting I have on",
    "engagement": "17 upvotes, 15 comments (archive snapshot), u/Upbeat_Main_7141",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-089",
    "found_date": "2026-10-23",
    "post_date": "2026-10-12",
    "source": "reddit r/fitbod (comment)",
    "link": "https://www.reddit.com/r/fitbod/comments/1x47yx6/previously_satisfied_customer/pfhtvo4/",
    "quote": "Fitbod got me started on this journey a few years ago but it’s certainly fallen behind.",
    "engagement": "2 upvotes (archive snapshot), u/daays",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-059",
    "found_date": "2026-10-23",
    "post_date": "2026-10-10",
    "source": "app_store Fitbod (US storefront)",
    "link": "https://apps.apple.com/us/app/id1041517543#review-14651302868",
    "quote": "Alternative: turn to LLM, tell it the gym equipment you’re using.",
    "engagement": "1★ review by 'Always D Wright 1', title: 'Chat, Claude, or for that matter any LLM is better than this app'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-061",
    "found_date": "2026-10-23",
    "post_date": "2026-10-10",
    "source": "app_store Fitbod (US storefront)",
    "link": "https://apps.apple.com/us/app/id1041517543#review-14651146279",
    "quote": "Would’ve dropped it long ago I just didn’t want to lose my history.",
    "engagement": "1★ review by 'JustinH220', title: 'Latest Update Trash'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-060",
    "found_date": "2026-10-23",
    "post_date": "2026-10-09",
    "source": "app_store Fitbod (US storefront)",
    "link": "https://apps.apple.com/us/app/id1041517543#review-14646778981",
    "quote": "it turned into a Paywall and you have to have $15 a month just to be able to open the app.",
    "engagement": "1★ review by 'HollyR429', title: 'Can’t use without paying'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-038",
    "found_date": "2026-10-23",
    "post_date": "2026-10-07",
    "source": "google_play Fitbod (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.fitbod.fitbod&reviewId=f788bc98-2ef5-42b1-a677-976a92eb155c",
    "quote": "I wish the monthly wasn't 15.99, and was cheaper, like $5~7.",
    "engagement": "2★ review by 'K Hogarth', 0 thumbs up",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-053",
    "found_date": "2026-10-23",
    "post_date": "2026-09-25",
    "source": "google_play SHRED (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=app.shred.android&reviewId=2883d39c-84d8-465c-8f8a-204eaf435f21",
    "quote": "I have a home gym set up and it use to customize the workout base on the equipment I have, now it just recommends me to do a different workout style instead of customizing.",
    "engagement": "1★ review by 'Luis Guerrero', 1 thumbs up",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-091",
    "found_date": "2026-10-23",
    "post_date": "2026-09-23",
    "source": "x",
    "link": "https://x.com/ariel_mariea/status/2102840152804532600",
    "quote": "I want a workout partner, an accountability partner to tell me to get up and get active! Is there an app for that?",
    "engagement": "@ariel_mariea (location: Washington, DC), 0 likes, 3 replies",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   }
  ],
  "proven_models": [
   {
    "id": "pm-us-20261023-02",
    "found_date": "2026-10-23",
    "app": "Ladder (coached strength training plans)",
    "country": "US (Ladder Technologies)",
    "model_and_price": "Subscription only, about $29.99/month (per X @consumerxai; price not checked in app tonight), team-based coach-led programs with daily workouts.",
    "traction_evidence": "#2 US Health & Fitness top-grossing on iOS (https://emberpicks.com/app/appstore/ladder-strength-training-plans/); 209,556 US App Store ratings; revenue estimate $430k–2.8M/month (https://appcurrents.com/apps/ladder-strength-training-plans-ios-1502936453); Peekly estimate ~$6.0M/month. All revenue figures are third-party estimates.",
    "us_status": "Done and growing in the US. Competitors: Future ($200/mo human coach), Caliber, Fitbod, Alpha Progression, Centr.",
    "entry_point": "A narrow niche version (e.g. home-gym-only or dumbbells-only coached plans) at a lower price. Weak evidence: US reviews want Garmin sync and lower prices; no strong complaint cluster against Ladder found tonight.",
    "why_not_done_yet": "Done. Ladder's moat is coaches, video content and paid acquisition, which a solo engineer cannot copy in 2 weeks (assessment).",
    "lifecycle_evidence": "Growth phase: top-grossing rank and huge rating count; heavy ad spend visible on X/Instagram (assessment).",
    "stream": "proven-model",
    "market": "US"
   }
  ],
  "distinct_people": 13,
  "distinct_people_note": "Counted from App Store/Play reviewer names, Reddit authors and X handles in the engagement field; no cross-platform dedup (not verified).",
  "weekly_counts": {
   "2026-W39": 2,
   "2026-W41": 4,
   "2026-W42": 5,
   "2026-W43": 2
  },
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 5,
   "last_week_iso": "2026-W41",
   "last_week": 4,
   "partial_week_W43": 2,
   "note": "US analyst 2026-10-23: counts by post_date over the scout's 30-day window (2026-09-23…2026-10-21); W43 (from Mon 19 Oct) is partial. First US run for these niches (home maintenance, home fitness), so week-over-week growth reflects one night's scouting, not the market."
  },
  "recurring": true,
  "recurring_note": "recurring=true if complaints fall in 3+ consecutive ISO weeks (by post_date). This pain: longest consecutive-week run 3; first US run for this niche, so no earlier-run comparison exists yet.",
  "scores": {
   "frequency": 4,
   "intensity": 3,
   "willingness_to_pay": 4,
   "reachability": 3,
   "buildability": 3,
   "total": 17
  },
  "score_notes": {
   "frequency": "13 complaints (Fitbod 8). r/fitbod 'same 10 exercises' post 17 upvotes / 15 comments (c-077). Proven demand: Fitbod 288,044 and Ladder 211,170 US App Store ratings (iTunes lookup).",
   "intensity": "Annoyance more than pain: “it's giving me the same 10 exercises no matter what setting I have on” (c-077); lock-in: “Would’ve dropped it long ago I just didn’t want to lose my history.” (c-061).",
   "willingness_to_pay": "People do pay: Fitbod “Worth the subscription price for sure.” (5★ US review); price pushback: “I wish the monthly wasn't 15.99, and was cheaper, like $5~7.” (c-038).",
   "reachability": "r/fitbod, r/homegym; App Store keyword 'fitbod alternative' (assessment). Crowded paid-ads space (Ladder, Fitbod).",
   "buildability": "An adaptive plan engine with a good exercise library and demos is more than 2 weeks for one person; an LLM wrapper is easy but users already do that themselves (c-059, c-078).",
   "method": "US analyst run 2026-10-23."
  },
  "gates": {
   "consumer_subscription": {
    "result": "pass",
    "text": "pass (Fitbod, Ladder sell US subscriptions)"
   },
   "simplest_way": {
    "result": "pass",
    "text": "pass (open app, today's workout is there)"
   },
   "us_entry": {
    "result": "borderline",
    "text": "maybe (reachable via r/fitbod, but the channel is ad-driven by funded players)"
   }
  },
  "gate_failed": null,
  "competitor_veto": false,
  "kill_reason": null,
  "borderline_note": "Near-miss at 17: proven paying demand, but buildability (exercise library, adaptive engine) and heavy funded competition hold it below 18; LLM substitution is a real threat.",
  "competitors": [
   {
    "name": "Fitbod",
    "url": "https://apps.apple.com/us/app/id1041517543",
    "price": "$15.99/mo (c-038), $120/yr (c-037); a renewal at $179.99 (c-057)",
    "price_source": "https://play.google.com/store/apps/details?id=com.fitbod.fitbod&reviewId=f788bc98-2ef5-42b1-a677-976a92eb155c",
    "loves": [
     {
      "quote": "I set my goals, it assigns a workout, I can alter if needed and it automatically increases weight as I become stronger.",
      "who": "5★ US App Store review by Ladyhops",
      "link": "https://apps.apple.com/us/app/id1041517543#review-14692713413"
     }
    ],
    "hates": [
     {
      "quote": "it turned into a Paywall and you have to have $15 a month just to be able to open the app.",
      "who": "c-060",
      "link": "https://apps.apple.com/us/app/id1041517543#review-14646778981"
     }
    ],
    "funding": "not checked"
   },
   {
    "name": "Ladder",
    "url": "https://apps.apple.com/us/app/id1502936453",
    "price": "~$29.99/mo (scout, via X; not checked)",
    "price_source": null,
    "loves": [],
    "hates": [
     {
      "quote": "For as much as you pay for this app you should be able to connect to Garmin directly",
      "who": "3★ US App Store review 'Eh'",
      "link": "https://apps.apple.com/us/app/id1502936453#review-14636725435"
     }
    ],
    "funding": "not checked (US company)"
   },
   {
    "name": "Boostcamp",
    "url": "https://www.boostcamp.app/",
    "price": "Free programs; Pro Auto Progression",
    "price_source": "https://www.boostcamp.app/",
    "loves": [],
    "hates": [],
    "funding": "not checked"
   },
   {
    "name": "ChatGPT/Claude (DIY)",
    "url": "https://apps.apple.com/us/app/id1041517543#review-14651302868",
    "price": "general-purpose",
    "price_source": null,
    "loves": [],
    "hates": [],
    "loves_hates_note": "Users name LLMs as the substitute: “Alternative: turn to LLM, tell it the gym equipment you’re using.” (c-059).",
    "funding": "n/a"
   }
  ],
  "gap": "A cheaper ($5–7/mo) adaptive planner that respects home-gym equipment and time off; real but contested by Fitbod, Ladder, free Boostcamp programs and DIY LLM use.",
  "plc": {
   "stage": "growth",
   "evidence": [
    "Category age: Fitbod on the US App Store since 2015-09-26; Ladder since 2020-06-23 (iTunes lookup).",
    "Growth/traction: Ladder #2 US Health & Fitness top-grossing (https://emberpicks.com/app/appstore/ladder-strength-training-plans/, via scout); revenue estimate $430k–2.8M/month (https://appcurrents.com/apps/ladder-strength-training-plans-ios-1502936453, third-party estimate).",
    "Competitor trend: Hevy now markets 'Hevy Coach' (hevyapp.com/about-us menu); Boostcamp offers 14,000+ free programs; users substituting LLMs (c-059, c-078).",
    "Price trend: $15.99/mo–$29.99/mo at the top; pushback to $5–7 (c-038). Search trend not checked."
   ],
   "verdict": "maybe",
   "verdictText": "maybe (assessment): growth supports a subscription, but the entrant needs a clear wedge (home-gym equipment awareness) against funded, ad-heavy leaders.",
   "assessment": true
  },
  "verdict": "near-miss"
 },
 {
  "painId": "p-080",
  "night": "2026-10-23",
  "analyst_run": "2026-10-23-us",
  "market": "US",
  "niche": "home fitness & workout logging",
  "name": null,
  "label": "Running apps paywalling basic tracking",
  "pitch": null,
  "price": null,
  "mvp": null,
  "killQuestion": null,
  "description": "US runners and walkers feel Strava, Runna and Nike Run Club are moving basic tracking (own stats, PBs, simple pace/time log) behind paywalls or into double subscriptions (Strava + Runna), and want an app that 'simply records' their efforts.",
  "who": "US recreational runners/walkers (US App Store/Play reviewers of Strava, Runna, Nike Run Club, Runkeeper; r/Strava)",
  "source": "complaints+proven-model",
  "evidenceSummary": "Strava, Runna and NRC users resent paying to see their own stats; Strava acquired Runna.",
  "complaint_ids": [
   "c-us-20261023-041",
   "c-us-20261023-042",
   "c-us-20261023-043",
   "c-us-20261023-044",
   "c-us-20261023-045",
   "c-us-20261023-046",
   "c-us-20261023-054",
   "c-us-20261023-065",
   "c-us-20261023-066",
   "c-us-20261023-067",
   "c-us-20261023-068",
   "c-us-20261023-083",
   "c-us-20261023-084",
   "c-us-20261023-085"
  ],
  "quotes": [
   {
    "id": "c-us-20261023-044",
    "found_date": "2026-10-23",
    "post_date": "2026-10-21",
    "source": "google_play Strava (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.strava&reviewId=af83e571-3284-48c6-9873-2825d7b560fb",
    "quote": "Essentially does nothing without a subscription. Free version used to be useful, now the updates have made it worthless unless you pay.",
    "engagement": "1★ review by 'Charlie Pantoja', 0 thumbs up",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-067",
    "found_date": "2026-10-23",
    "post_date": "2026-10-20",
    "source": "app_store Strava (US storefront)",
    "link": "https://apps.apple.com/us/app/id426826309#review-14689163875",
    "quote": "This app tracks your own information and then hides it behind a paywall.",
    "engagement": "1★ review by 'Gac5a', title: 'Information Thief'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-045",
    "found_date": "2026-10-23",
    "post_date": "2026-10-19",
    "source": "google_play Strava (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.strava&reviewId=206ce1de-d68a-4b46-926f-2ffc308e40f0",
    "quote": "Strava was great before they put all of their features behind a pay wall.",
    "engagement": "1★ review by 'Katrin Hewer', 2 thumbs up",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-083",
    "found_date": "2026-10-23",
    "post_date": "2026-10-19",
    "source": "reddit r/Strava (comment)",
    "link": "https://www.reddit.com/r/Strava/comments/1x9p7k3/strava_rude_paywall/phn9z7k/",
    "quote": "it kind of doesn't track all time PBs, just this year I believe. Really hard to track my progress",
    "engagement": "2 upvotes (archive snapshot), u/Metomeelpalo",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-084",
    "found_date": "2026-10-23",
    "post_date": "2026-10-19",
    "source": "reddit r/Strava (comment)",
    "link": "https://www.reddit.com/r/Strava/comments/1x9p7k3/strava_rude_paywall/phnd7zv/",
    "quote": "Sad I know, that I have to pay to see my own times.",
    "engagement": "1 upvotes (archive snapshot), u/sireatalot",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-085",
    "found_date": "2026-10-23",
    "post_date": "2026-10-19",
    "source": "reddit r/Strava (comment)",
    "link": "https://www.reddit.com/r/Strava/comments/1x9p7k3/strava_rude_paywall/phn8twn/",
    "quote": "Now with full price I don’t. Even though I want to convince myself otherwise, it’s a hard no.",
    "engagement": "2 upvotes (archive snapshot), u/Helloworld_ish",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-041",
    "found_date": "2026-10-23",
    "post_date": "2026-10-12",
    "source": "google_play Nike Run Club (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.nike.plusgps&reviewId=67b1a0fa-d568-456c-8af3-f3518eed9fc4",
    "quote": "it doesn't do the very basic instruction of just keeping track of my miles my pace and my time.",
    "engagement": "1★ review by 'Bwarinonn Swarchleast', 0 thumbs up",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-042",
    "found_date": "2026-10-23",
    "post_date": "2026-10-12",
    "source": "google_play Runna (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.runbuddy.prod&reviewId=b24a4463-f108-4018-9f3b-53aaf668be0f",
    "quote": "Free version is useless and paid version is crazy expensive for what you get.",
    "engagement": "1★ review by 'Angus Judd', 0 thumbs up",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-043",
    "found_date": "2026-10-23",
    "post_date": "2026-10-11",
    "source": "google_play Runna (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.runbuddy.prod&reviewId=161df315-b04c-4671-8283-f0b44571c14a",
    "quote": "Would lock up during runs and not log the total miles or even whole workouts. Not worth $160.",
    "engagement": "1★ review by 'Kris Berkholder', 0 thumbs up",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-046",
    "found_date": "2026-10-23",
    "post_date": "2026-10-11",
    "source": "google_play Strava (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.strava&reviewId=f2f74b5f-47f1-444a-85c6-e181b23efdf3",
    "quote": "Will replace just as soon as I find another app that will simply record my efforts so I can track my progress.",
    "engagement": "2★ review by 'Kelly Sonerholm', 0 thumbs up",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-065",
    "found_date": "2026-10-23",
    "post_date": "2026-10-09",
    "source": "app_store Runna (US storefront)",
    "link": "https://apps.apple.com/us/app/id1594204443#review-14646498554",
    "quote": "Why am I spending another $20/mo for a less capable Strava that I already pay for?",
    "engagement": "2★ review by 'dcian', title: 'Vibe coded POS'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-068",
    "found_date": "2026-10-23",
    "post_date": "2026-10-08",
    "source": "app_store Strava (US storefront)",
    "link": "https://apps.apple.com/us/app/id426826309#review-14643826826",
    "quote": "Sure I don’t pay for the subscription because it’s ridiculously expensive.",
    "engagement": "1★ review by 'Kindmd', title: 'Gets worse with every update'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-054",
    "found_date": "2026-10-23",
    "post_date": "2026-10-05",
    "source": "google_play Runkeeper (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.fitnesskeeper.runkeeper.pro&reviewId=21b859e4-cad4-44ba-a6f6-46694b6b0893",
    "quote": "I care far less about \"social\" features and \"challenges\" than I do about having a simple, clean, functional app for workouts.",
    "engagement": "3★ review by 'Quinlan Malloy', 0 thumbs up",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-066",
    "found_date": "2026-10-23",
    "post_date": "2026-09-23",
    "source": "app_store Runna (US storefront)",
    "link": "https://apps.apple.com/us/app/id1594204443#review-14585173873",
    "quote": "I’m already a premium member on Strava and don’t think I should have to pay twice to utilize this app as well.",
    "engagement": "3★ review by 'Juice Brenner', title: 'Too Expensive'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   }
  ],
  "proven_models": [
   {
    "id": "pm-us-20261023-03",
    "found_date": "2026-10-23",
    "app": "Runna (running training plans)",
    "country": "UK (acquired by Strava, 17 Apr 2025)",
    "model_and_price": "Subscription: £15.99/month or £99.99/year in the UK (https://bmmagazine.co.uk/get-funded/strava-acquires-uk-running-app-runna-in-multimillion-pound-deal/); US reviews mention about $20/month and $160/year. Now bundled with Strava.",
    "traction_evidence": "Acquired by Strava (https://www.runna.com/strava-acquires-runna); profitable since 2023 per BM Magazine; ~$2M/month revenue estimate (https://adapty.io/paywall-library/runna-running-training-plans/, estimate).",
    "us_status": "Already in the US and owned by Strava. US users complain about paying twice (Strava + Runna) and about price: https://apps.apple.com/us/app/id1594204443#review-14646498554 , https://apps.apple.com/us/app/id1594204443#review-14585173873 , https://play.google.com/store/apps/details?id=com.runbuddy.prod&reviewId=b24a4463-f108-4018-9f3b-53aaf668be0f",
    "entry_point": "A cheap adaptive plan generator for one race (e.g. a one-time fee per race plan) for runners who refuse a second subscription.",
    "why_not_done_yet": "Done. Strava + Runna, Nike Run Club (free), Garmin Coach (free), TrainingPeaks and many AI plan apps cover this (assessment). Competitor veto likely.",
    "lifecycle_evidence": "Consolidation: the category leader bought the top plan app in 2025; pricing is rising (bundles). Assessment.",
    "stream": "proven-model",
    "market": "US"
   }
  ],
  "distinct_people": 14,
  "distinct_people_note": "Counted from App Store/Play reviewer names, Reddit authors and X handles in the engagement field; no cross-platform dedup (not verified).",
  "weekly_counts": {
   "2026-W39": 1,
   "2026-W41": 5,
   "2026-W42": 2,
   "2026-W43": 6
  },
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 2,
   "last_week_iso": "2026-W41",
   "last_week": 5,
   "partial_week_W43": 6,
   "note": "US analyst 2026-10-23: counts by post_date over the scout's 30-day window (2026-09-23…2026-10-21); W43 (from Mon 19 Oct) is partial. First US run for these niches (home maintenance, home fitness), so week-over-week growth reflects one night's scouting, not the market."
  },
  "recurring": true,
  "recurring_note": "recurring=true if complaints fall in 3+ consecutive ISO weeks (by post_date). This pain: longest consecutive-week run 3; first US run for this niche, so no earlier-run comparison exists yet.",
  "scores": {
   "frequency": 5,
   "intensity": 3,
   "willingness_to_pay": 1,
   "reachability": 4,
   "buildability": 3,
   "total": 16
  },
  "score_notes": {
   "frequency": "14 complaints; Strava 274 and Runna 25 low Play reviews pulled by the scout in 30 days (us/work/2026-10-23/gp_raw.json). Strava 378,452 and NRC 419,842 US App Store ratings.",
   "intensity": "“Sad I know, that I have to pay to see my own times.” (c-084); “Will replace just as soon as I find another app that will simply record my efforts so I can track my progress.” (c-046).",
   "willingness_to_pay": "Low — the complaint is about paying at all: “Sure I don’t pay for the subscription because it’s ridiculously expensive.” (c-068); “Now with full price I don’t. Even though I want to convince myself otherwise, it’s a hard no.” (c-085). Free NRC and Strava free tier cap the price.",
   "reachability": "r/Strava, r/running, App Store 'strava alternative' (assessment).",
   "buildability": "GPS recording with reliable background tracking on iOS/Android plus maps is feasible but fiddly; Runna's own reviews show logging failures (c-043).",
   "method": "US analyst run 2026-10-23."
  },
  "gates": {
   "consumer_subscription": {
    "result": "fail",
    "text": "fail (users want free tracking; NRC is free)"
   },
   "simplest_way": {
    "result": "pass",
    "text": "pass (tap start)"
   },
   "us_entry": {
    "result": "pass",
    "text": "pass on mechanics"
   }
  },
  "gate_failed": "consumer_subscription",
  "competitor_veto": false,
  "kill_reason": null,
  "borderline_note": "Near-miss at 16 and fails the subscription gate: loud and reachable, but users want free tracking and NRC/Strava free tiers cover it.",
  "competitors": [
   {
    "name": "Nike Run Club",
    "url": "https://apps.apple.com/us/app/id387771637",
    "price": "Free",
    "price_source": "iTunes lookup",
    "loves": [
     {
      "quote": "It’s free, not overwhelming, and easy to use.",
      "who": "5★ US App Store review by Devora Banarer",
      "link": "https://apps.apple.com/us/app/id387771637#review-14659856732"
     }
    ],
    "hates": [
     {
      "quote": "it doesn't do the very basic instruction of just keeping track of my miles my pace and my time.",
      "who": "c-041",
      "link": "https://play.google.com/store/apps/details?id=com.nike.plusgps&reviewId=67b1a0fa-d568-456c-8af3-f3518eed9fc4"
     }
    ],
    "funding": "Nike"
   },
   {
    "name": "Strava (+Runna)",
    "url": "https://apps.apple.com/us/app/id426826309",
    "price": "Free tier; subscription (Runna ~$20/mo per c-065)",
    "price_source": "https://apps.apple.com/us/app/id1594204443#review-14646498554",
    "loves": [
     {
      "quote": "The free version is good enough.",
      "who": "4★ US App Store review by aasigo",
      "link": "https://apps.apple.com/us/app/id426826309#review-14678236591"
     }
    ],
    "hates": [
     {
      "quote": "This app tracks your own information and then hides it behind a paywall.",
      "who": "c-067",
      "link": "https://apps.apple.com/us/app/id426826309#review-14689163875"
     }
    ],
    "funding": "Strava (acquired Runna 2025)"
   }
  ],
  "gap": "A free-feeling simple tracker exists (NRC, Strava free); the gap is not monetisable as a subscription.",
  "plc": {
   "stage": "maturity",
   "evidence": [
    "Category age: NRC on the US App Store since 2010-09-06, Strava since 2011-03-24 (iTunes lookup).",
    "Consolidation: Strava agreed to acquire Runna on 17 Apr 2025 (https://www.runna.com/strava-acquires-runna).",
    "Market growth claim: Strava says “Running is booming worldwide—nearly 1 billion runs were recorded on Strava in 2024.” (same page) — demand grows but the tracker layer is commoditised/free.",
    "Price trend: features moving behind paywalls (c-044, c-045, c-067). Search trend not checked."
   ],
   "verdict": "no",
   "verdictText": "no (assessment) for a simple tracker subscription: mature, free leaders; plan coaching (Runna) is a growth sub-segment already consolidated by Strava.",
   "assessment": true
  },
  "verdict": "near-miss"
 },
 {
  "painId": "p-081",
  "night": "2026-10-23",
  "analyst_run": "2026-10-23-us",
  "market": "US",
  "niche": "home fitness & workout logging",
  "name": null,
  "label": "Peloton membership price rises",
  "pitch": null,
  "price": null,
  "mvp": null,
  "killQuestion": null,
  "description": "Peloton members resent membership price rises (e.g. $12→$24 app tier, $41.73→$57.22 all-access) for an app that still feels lacking.",
  "who": "US Peloton owners/app members (Play/App Store reviewers, r/pelotoncycle)",
  "source": "complaints",
  "evidenceSummary": "4 complaints from 4 people (Reddit 2, Google Play 1, App Store 1).",
  "complaint_ids": [
   "c-us-20261023-040",
   "c-us-20261023-064",
   "c-us-20261023-081",
   "c-us-20261023-082"
  ],
  "quotes": [
   {
    "id": "c-us-20261023-040",
    "found_date": "2026-10-23",
    "post_date": "2026-10-14",
    "source": "google_play Peloton (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.onepeloton.callisto&reviewId=852a66db-f8a5-4ea1-9ff3-9b0bb1ae0261",
    "quote": "Not to mention they doubled the monthly fee from $12 to $24 if you want to take more than 3 classes A MONTH.",
    "engagement": "1★ review by 'Tara Ballard', 0 thumbs up",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-081",
    "found_date": "2026-10-23",
    "post_date": "2026-10-05",
    "source": "reddit r/pelotoncycle (comment)",
    "link": "https://www.reddit.com/r/pelotoncycle/comments/1wxrvjl/cancellation_offers/pdzs0qu/",
    "quote": "I got mine in 2020 and it went from $41.73 to now $57.22 and I couldn't justify it any longer either",
    "engagement": "2 upvotes (archive snapshot), u/piratekitty10",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-082",
    "found_date": "2026-10-23",
    "post_date": "2026-10-05",
    "source": "reddit r/pelotoncycle (comment)",
    "link": "https://www.reddit.com/r/pelotoncycle/comments/1wxrvjl/cancellation_offers/pdwla4r/",
    "quote": "I got offered 25% off 1 month to stay. A whole $12 savings.",
    "engagement": "54 upvotes (archive snapshot), u/Manthem",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-064",
    "found_date": "2026-10-23",
    "post_date": "2026-10-04",
    "source": "app_store Peloton (US storefront)",
    "link": "https://apps.apple.com/us/app/id792750948#review-14626896806",
    "quote": "It’s a ridiculous experience for an app I pay over 40 dollars a month to use.",
    "engagement": "3★ review by 'Nicknames2018', title: 'Serviceable but lacking'",
    "niche": "home fitness & workout logging",
    "stream": "problem",
    "market": "US"
   }
  ],
  "proven_models": [],
  "distinct_people": 4,
  "distinct_people_note": "Counted from App Store/Play reviewer names, Reddit authors and X handles in the engagement field; no cross-platform dedup (not verified).",
  "weekly_counts": {
   "2026-W40": 1,
   "2026-W41": 2,
   "2026-W42": 1
  },
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 1,
   "last_week_iso": "2026-W41",
   "last_week": 2,
   "partial_week_W43": 0,
   "note": "US analyst 2026-10-23: counts by post_date over the scout's 30-day window (2026-09-23…2026-10-21); W43 (from Mon 19 Oct) is partial. First US run for these niches (home maintenance, home fitness), so week-over-week growth reflects one night's scouting, not the market."
  },
  "recurring": true,
  "recurring_note": "recurring=true if complaints fall in 3+ consecutive ISO weeks (by post_date). This pain: longest consecutive-week run 3; first US run for this niche, so no earlier-run comparison exists yet.",
  "scores": {
   "frequency": 2,
   "intensity": 3,
   "willingness_to_pay": 2,
   "reachability": 3,
   "buildability": 1,
   "total": 11
  },
  "score_notes": {
   "frequency": "4 complaints; r/pelotoncycle comment 54 upvotes (c-082).",
   "intensity": "“I got mine in 2020 and it went from $41.73 to now $57.22 and I couldn't justify it any longer either” (c-081).",
   "willingness_to_pay": "They already pay $24–57/mo but are trading down.",
   "reachability": "r/pelotoncycle.",
   "buildability": "Needs instructor video content and bike integration; not a solo 2-week build.",
   "method": "US analyst run 2026-10-23."
  },
  "gates": {
   "consumer_subscription": {
    "result": "not-assessed",
    "text": "not assessed (below bar)"
   },
   "simplest_way": {
    "result": "not-assessed",
    "text": "not assessed"
   },
   "us_entry": {
    "result": "not-assessed",
    "text": "not assessed"
   }
  },
  "gate_failed": "buildability",
  "competitor_veto": false,
  "kill_reason": null,
  "borderline_note": null,
  "competitors": [],
  "gap": "Content/hardware business; not for Judi.",
  "plc": null,
  "verdict": "below-bar"
 },
 {
  "painId": "p-082",
  "night": "2026-10-23",
  "analyst_run": "2026-10-23-us",
  "market": "US",
  "niche": "home maintenance & homeowners",
  "name": null,
  "label": "Smart-thermostat app regressions",
  "pitch": null,
  "price": null,
  "mvp": null,
  "killQuestion": null,
  "description": "US smart-thermostat owners (ecobee, Honeywell/Resideo) hate app regressions and in-app ads: comfort settings and schedules removed, remote control unreliable, ads on the home screen of a device they paid for; some want a non-subscription, non-'smart' thermostat.",
  "who": "US homeowners with ecobee or Honeywell/Resideo thermostats (Play/App Store reviewers; r/HomeMaintenance)",
  "source": "complaints",
  "evidenceSummary": "10 complaints from 10 people (Google Play 5, App Store 4, Reddit 1).",
  "complaint_ids": [
   "c-us-20261023-001",
   "c-us-20261023-002",
   "c-us-20261023-003",
   "c-us-20261023-004",
   "c-us-20261023-006",
   "c-us-20261023-012",
   "c-us-20261023-013",
   "c-us-20261023-014",
   "c-us-20261023-015",
   "c-us-20261023-017"
  ],
  "quotes": [
   {
    "id": "c-us-20261023-017",
    "found_date": "2026-10-23",
    "post_date": "2026-10-20",
    "source": "reddit r/HomeMaintenance",
    "link": "https://www.reddit.com/r/HomeMaintenance/comments/1xaztuf/best_nonsubscription_thermostat/",
    "quote": "We don’t want any subscriptions, we don’t care about most “smart” features",
    "engagement": "18 upvotes, 31 comments (archive snapshot), u/rovemovelove",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-001",
    "found_date": "2026-10-23",
    "post_date": "2026-10-19",
    "source": "google_play ecobee (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.ecobee.athenamobile&reviewId=18795615-03cf-473c-8cef-d8b00f541876",
    "quote": "the newest app update removed the different comfort settings for home, away, sleep. you have to walk back to the wall device to adjust between those categories.",
    "engagement": "1★ review by 'Tori Fowler', 2 thumbs up",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-013",
    "found_date": "2026-10-23",
    "post_date": "2026-10-17",
    "source": "app_store ecobee (US storefront)",
    "link": "https://apps.apple.com/us/app/id916985674#review-14677488710",
    "quote": "Ecobee is clunky, has fewer functions, and comes across as one long advertisement. I already paid for my Generac system and resent seeing ads all the time.",
    "engagement": "1★ review by 'ADLev10', title: 'More ads, less function.'",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-012",
    "found_date": "2026-10-23",
    "post_date": "2026-10-16",
    "source": "app_store ecobee (US storefront)",
    "link": "https://apps.apple.com/us/app/id916985674#review-14675244145",
    "quote": "Can’t make a change for 1 hour or 30 minutes so I have to keep doing it manually?",
    "engagement": "2★ review by 'whoit', title: 'Recent changes to Comfort Settings page are TERRIBLE'",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-003",
    "found_date": "2026-10-23",
    "post_date": "2026-10-15",
    "source": "google_play ecobee (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.ecobee.athenamobile&reviewId=15865039-52f9-4cf1-8213-cdfdf6907150",
    "quote": "The schedule feature only allows for one schedule, which means I'm constantly editing it, instead of having multiple schedules available to switch between as weather and seasons change.",
    "engagement": "2★ review by 'Chris Villanueva', 2 thumbs up",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-014",
    "found_date": "2026-10-23",
    "post_date": "2026-10-08",
    "source": "app_store ecobee (US storefront)",
    "link": "https://apps.apple.com/us/app/id916985674#review-14644184042",
    "quote": "They went from showing an ad for their other products you don’t own like once a month to now every single time you launch the app.",
    "engagement": "1★ review by 'Toshbar', title: 'Ads on the Home Screen'",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-004",
    "found_date": "2026-10-23",
    "post_date": "2026-10-03",
    "source": "google_play ecobee (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.ecobee.athenamobile&reviewId=f9ff1fc8-7acc-4a8a-b7da-976f5c5ac4df",
    "quote": "It should have a history report for every hour day and week, to keep track of the time on and off, to see if there is some saving.",
    "engagement": "1★ review by 'Abraham Sierra', 1 thumbs up",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-006",
    "found_date": "2026-10-23",
    "post_date": "2026-10-03",
    "source": "google_play Resideo (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.honeywell.android.lyric&reviewId=1c21a4ab-0a80-4761-868b-a8db44e830a0",
    "quote": "Good luck trying to set your thermostat remotely because it works maybe 1 time out of 10.",
    "engagement": "1★ review by 'Adam Haut', 11 thumbs up",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-002",
    "found_date": "2026-10-23",
    "post_date": "2026-09-24",
    "source": "google_play ecobee (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.ecobee.athenamobile&reviewId=9d13b91b-9684-4a78-b198-dbc2055e91b1",
    "quote": "ads everywhere, intrusive pop-ups. I've seen this slope before. what next year I'll need a subscription to change temperature from my phone?",
    "engagement": "2★ review by 'Zach Crowley', 0 thumbs up",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-015",
    "found_date": "2026-10-23",
    "post_date": "2026-09-24",
    "source": "app_store ecobee (US storefront)",
    "link": "https://apps.apple.com/us/app/id916985674#review-14589599322",
    "quote": "I paid a lot for this thermostat. It belongs to me. No company, even the manufacturer, should be able to use it to show me ads unless I ask for that.",
    "engagement": "1★ review by 'Completely original nickname 249673', title: 'Buggy and has ads'",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   }
  ],
  "proven_models": [],
  "distinct_people": 10,
  "distinct_people_note": "Counted from App Store/Play reviewer names, Reddit authors and X handles in the engagement field; no cross-platform dedup (not verified).",
  "weekly_counts": {
   "2026-W39": 2,
   "2026-W40": 2,
   "2026-W41": 1,
   "2026-W42": 3,
   "2026-W43": 2
  },
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 3,
   "last_week_iso": "2026-W41",
   "last_week": 1,
   "partial_week_W43": 2,
   "note": "US analyst 2026-10-23: counts by post_date over the scout's 30-day window (2026-09-23…2026-10-21); W43 (from Mon 19 Oct) is partial. First US run for these niches (home maintenance, home fitness), so week-over-week growth reflects one night's scouting, not the market."
  },
  "recurring": true,
  "recurring_note": "recurring=true if complaints fall in 3+ consecutive ISO weeks (by post_date). This pain: longest consecutive-week run 5; first US run for this niche, so no earlier-run comparison exists yet.",
  "scores": {
   "frequency": 4,
   "intensity": 3,
   "willingness_to_pay": 1,
   "reachability": 3,
   "buildability": 1,
   "total": 12
  },
  "score_notes": {
   "frequency": "10 complaints; ecobee 82 and Resideo 55 low Play reviews pulled by the scout (gp_raw.json); r/HomeMaintenance 'best non-subscription thermostat' 18 upvotes / 31 comments (c-017).",
   "intensity": "“I paid a lot for this thermostat. It belongs to me. No company, even the manufacturer, should be able to use it to show me ads unless I ask for that.” (c-015).",
   "willingness_to_pay": "Negative: “We don’t want any subscriptions, we don’t care about most “smart” features” (c-017).",
   "reachability": "Brand subreddits/Play reviews.",
   "buildability": "Requires thermostat vendor APIs or device integrations (e.g. via Home Assistant); a third-party app can't remove ecobee's ads or restore removed firmware/app features (assessment).",
   "method": "US analyst run 2026-10-23."
  },
  "gates": {
   "consumer_subscription": {
    "result": "fail",
    "text": "fail (users reject subscriptions here, c-017)"
   },
   "simplest_way": {
    "result": "not-assessed",
    "text": "n/a"
   },
   "us_entry": {
    "result": "not-assessed",
    "text": "n/a"
   }
  },
  "gate_failed": "buildability / consumer_subscription",
  "competitor_veto": false,
  "kill_reason": null,
  "borderline_note": null,
  "competitors": [],
  "gap": "Vendor-locked; not a software opportunity for Judi.",
  "plc": null,
  "verdict": "below-bar"
 },
 {
  "painId": "p-083",
  "night": "2026-10-23",
  "analyst_run": "2026-10-23-us",
  "market": "US",
  "niche": "home maintenance & homeowners",
  "name": null,
  "label": "Home-maintenance reminders",
  "pitch": null,
  "price": null,
  "mvp": null,
  "killQuestion": null,
  "description": "US homeowners lack a reliable reminder for recurring maintenance like HVAC filter changes (thermostat app reminders fail; people ask whether a calendar is the best way); HomeZada-style home-maintenance organizers exist but show little paid traction.",
  "who": "US homeowners doing routine upkeep (Resideo Play reviewer; X user in Salt Lake City)",
  "source": "complaints+proven-model",
  "evidenceSummary": "2 complaints from 2 people (X 1, Google Play 1); proven model HomeZada.",
  "complaint_ids": [
   "c-us-20261023-005",
   "c-us-20261023-027"
  ],
  "quotes": [
   {
    "id": "c-us-20261023-027",
    "found_date": "2026-10-23",
    "post_date": "2026-10-18",
    "source": "x",
    "link": "https://x.com/Peters753dd/status/2111905053820756036",
    "quote": "Do you guys put air filter changes on a calendar, or is there a better way to keep track?",
    "engagement": "@Peters753dd (location: Salt Lake City, Utah), 0 likes, 0 replies",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-005",
    "found_date": "2026-10-23",
    "post_date": "2026-10-11",
    "source": "google_play Resideo (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.honeywell.android.lyric&reviewId=6ed078ea-c4d2-469c-88c6-bf45685e15df",
    "quote": "the one thing I need this app to do for me is remind me to replace the filter. CAN NOT EVEN DO THAT worthless p.o.s.",
    "engagement": "1★ review by 'Kevin Harper', 0 thumbs up",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   }
  ],
  "proven_models": [
   {
    "id": "pm-us-20261023-04",
    "found_date": "2026-10-23",
    "app": "HomeZada (home maintenance & home inventory organizer)",
    "country": "US",
    "model_and_price": "Freemium: free tier, about $99/year and about $189/year premium tiers (https://realestateledger.io/guides/home-maintenance-schedule-app, not checked in app).",
    "traction_evidence": "Raised a $2.1M seed (https://www.homezada.com/press/homezada-closes-a-two-million-seed-round-of-investment). Weak consumer traction: only 44 US App Store ratings at 2.86★ (iTunes lookup tonight). Peer Centriq shut down (date unclear: Jan 2025 per realestateledger.io vs 2026 per https://onehaus.app/blog/best-home-maintenance-apps-2026); Oply raised ~$180K (CB Insights); Dwellin ~180 iOS ratings; Hippo Home 1,596 ratings (insurer-backed, free).",
    "us_status": "Exists but has not proven paid demand: most US home-maintenance apps are free (insurer- or lead-gen-funded) or tiny. US homeowners still use calendars/spreadsheets for filter changes: https://x.com/Peters753dd/status/2111905053820756036 ; app reminders fail: https://play.google.com/store/apps/details?id=com.honeywell.android.lyric&reviewId=6ed078ea-c4d2-469c-88c6-bf45685e15df ; home-warranty denials for missing maintenance records: https://www.reddit.com/r/homeowners/comments/1x0tmym/nightmare_choice_home_warranty/",
    "entry_point": "A 'maintenance proof' log (dated photos/receipts per appliance) that helps with home-warranty claims and resale, plus simple reminders. Several founders were already pitching similar tools on X tonight (Mendstamp, ClaimCairn).",
    "why_not_done_yet": "Low willingness to pay: homeowners want it free, and the category is littered with dead or tiny apps (Centriq). The money in this space sits with lead-gen marketplaces (Angi, Thumbtack) and warranties, not with logs (assessment).",
    "lifecycle_evidence": "Stagnant/failing: a decade of attempts, one shutdown, low ratings counts. Assessment.",
    "stream": "proven-model",
    "market": "US"
   }
  ],
  "distinct_people": 2,
  "distinct_people_note": "Counted from App Store/Play reviewer names, Reddit authors and X handles in the engagement field; no cross-platform dedup (not verified).",
  "weekly_counts": {
   "2026-W41": 1,
   "2026-W42": 1
  },
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 1,
   "last_week_iso": "2026-W41",
   "last_week": 1,
   "partial_week_W43": 0,
   "note": "US analyst 2026-10-23: counts by post_date over the scout's 30-day window (2026-09-23…2026-10-21); W43 (from Mon 19 Oct) is partial. First US run for these niches (home maintenance, home fitness), so week-over-week growth reflects one night's scouting, not the market."
  },
  "recurring": false,
  "recurring_note": "recurring=true if complaints fall in 3+ consecutive ISO weeks (by post_date). This pain: longest consecutive-week run 2; first US run for this niche, so no earlier-run comparison exists yet.",
  "scores": {
   "frequency": 2,
   "intensity": 2,
   "willingness_to_pay": 1,
   "reachability": 3,
   "buildability": 5,
   "total": 13
  },
  "score_notes": {
   "frequency": "2 complaints only; proven-model traction weak (HomeZada 44 US ratings).",
   "intensity": "“the one thing I need this app to do for me is remind me to replace the filter. CAN NOT EVEN DO THAT worthless p.o.s.” (c-005).",
   "willingness_to_pay": "A calendar solves it for free: “Do you guys put air filter changes on a calendar, or is there a better way to keep track?” (c-027). The scout's HomeZada notes conclude homeowners want it free (assessment).",
   "reachability": "r/HomeMaintenance, r/homeowners.",
   "buildability": "Trivial to build.",
   "method": "US analyst run 2026-10-23."
  },
  "gates": {
   "consumer_subscription": {
    "result": "fail",
    "text": "fail (low WTP; calendar substitute)"
   },
   "simplest_way": {
    "result": "pass",
    "text": "pass"
   },
   "us_entry": {
    "result": "pass",
    "text": "pass on mechanics"
   }
  },
  "gate_failed": "consumer_subscription",
  "competitor_veto": false,
  "kill_reason": null,
  "borderline_note": null,
  "competitors": [],
  "gap": "Free calendars/insurer apps cover it; proven-model evidence of paid demand is weak.",
  "plc": null,
  "verdict": "below-bar"
 },
 {
  "painId": "p-084",
  "night": "2026-10-23",
  "analyst_run": "2026-10-23-us",
  "market": "US",
  "niche": "home maintenance & homeowners",
  "name": null,
  "label": "Home-warranty claim denials",
  "pitch": null,
  "price": null,
  "mvp": null,
  "killQuestion": null,
  "description": "US homeowners who pay for home warranties (American Home Shield, Choice, First American) get claims denied as 'abuse', 'physical damage', pre-existing or procedure violations, pay service fees for nothing, and recoup a fraction of premiums.",
  "who": "US homeowners with home-warranty contracts (Play/App Store reviewers of AHS; r/homeowners, r/HomeMaintenance; X users in TN, OH, NC, CA)",
  "source": "complaints",
  "evidenceSummary": "American Home Shield, Choice and First American reviewers report denied claims and cash-in-lieu lowballs.",
  "complaint_ids": [
   "c-us-20261023-007",
   "c-us-20261023-008",
   "c-us-20261023-011",
   "c-us-20261023-019",
   "c-us-20261023-020",
   "c-us-20261023-028",
   "c-us-20261023-029",
   "c-us-20261023-030",
   "c-us-20261023-031",
   "c-us-20261023-032",
   "c-us-20261023-033",
   "c-us-20261023-034",
   "c-us-20261023-035"
  ],
  "quotes": [
   {
    "id": "c-us-20261023-034",
    "found_date": "2026-10-23",
    "post_date": "2026-10-21",
    "source": "x",
    "link": "https://x.com/Travis5384/status/2112918377979322857",
    "quote": "how are customers supposed to stay warm when nighttime temps drop to 27°F and you refuse to handle a claim?",
    "engagement": "@Travis5384 (location: None), 0 likes, 1 replies",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-035",
    "found_date": "2026-10-23",
    "post_date": "2026-10-17",
    "source": "x",
    "link": "https://x.com/johndstewart76/status/2111537921144602848",
    "quote": "Been paying for a home warranty and every time I try to file a claim. It’s not covered.",
    "engagement": "@johndstewart76 (location: None), 0 likes, 3 replies",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-031",
    "found_date": "2026-10-23",
    "post_date": "2026-10-15",
    "source": "x",
    "link": "https://x.com/SaurabhSoni25/status/2110748180203930005",
    "quote": "Denied claim appeal closed with no response.",
    "engagement": "@SaurabhSoni25 (location: North Carolina, USA), 0 likes, 2 replies",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-011",
    "found_date": "2026-10-23",
    "post_date": "2026-10-14",
    "source": "app_store American Home Shield (US storefront)",
    "link": "https://apps.apple.com/us/app/id6499445456#review-14666006265",
    "quote": "I’m about ready to cancel my home warranty due to the companies they assign either not calling at all or scheduling appointments and not showing.",
    "engagement": "2★ review by 'Jnmhdb', title: 'Not sure about their service companies'",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-030",
    "found_date": "2026-10-23",
    "post_date": "2026-10-13",
    "source": "x",
    "link": "https://x.com/lparida49/status/2110151469685199135",
    "quote": "my handyman still fixes most things.planning to cancel my membership and request a refund. What exactly am I paying for?",
    "engagement": "@lparida49 (location: Los Angeles (HQ), BBSR, India), 0 likes, 1 replies",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-032",
    "found_date": "2026-10-23",
    "post_date": "2026-10-13",
    "source": "x",
    "link": "https://x.com/makeamovemike/status/2109900324869939529",
    "quote": "First American denied the claim because I didn’t call them first.",
    "engagement": "@makeamovemike (location: San Diego, California), 1 likes, 0 replies",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-028",
    "found_date": "2026-10-23",
    "post_date": "2026-10-12",
    "source": "x",
    "link": "https://x.com/MrRusty79/status/2109711705848647886",
    "quote": "IS THERE ANY HOME WARRANTY COMPANY ANYWHERE THAT ACTUALLY COVERS WHAT THEY SAY?",
    "engagement": "@MrRusty79 (location: Jackson, TN), 0 likes, 0 replies",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-033",
    "found_date": "2026-10-23",
    "post_date": "2026-10-12",
    "source": "x",
    "link": "https://x.com/CarolRehor/status/2109741397645623476",
    "quote": "A home warranty that excludes pre-existing conditions can turn down almost any claim on an older house.",
    "engagement": "@CarolRehor (location: USA), 1 likes, 0 replies",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-020",
    "found_date": "2026-10-23",
    "post_date": "2026-10-09",
    "source": "reddit r/HomeMaintenance",
    "link": "https://www.reddit.com/r/HomeMaintenance/comments/1x1ab7g/chw_heavily_advertises_ontv_denies_my_kitchen/",
    "quote": "CHW approved some plumbing components but denied the faucet and shutoff valve as “physical damage.”",
    "engagement": "3 upvotes, 2 comments (archive snapshot), u/Beginning-Tart-2836",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-019",
    "found_date": "2026-10-23",
    "post_date": "2026-10-08",
    "source": "reddit r/homeowners",
    "link": "https://www.reddit.com/r/homeowners/comments/1x0tmym/nightmare_choice_home_warranty/",
    "quote": "recouping less than $500 of the $2422 I paid for three years of coverage",
    "engagement": "0 upvotes, 9 comments (archive snapshot), u/AbelianCommuter",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-029",
    "found_date": "2026-10-23",
    "post_date": "2026-10-03",
    "source": "x",
    "link": "https://x.com/sankar22222/status/2106193937358827953",
    "quote": "After five years, I’ve realized that having a home warranty is completely useless.",
    "engagement": "@sankar22222 (location: Cincinnati, OH), 0 likes, 1 replies",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-008",
    "found_date": "2026-10-23",
    "post_date": "2026-10-01",
    "source": "google_play American Home Shield (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.ahs.mobile&reviewId=9f4b9565-3f56-43e7-b71d-d1a2e21cd756",
    "quote": "ASH refused to cover then offered $127 cash in lieu to fix a $2800 problem.",
    "engagement": "1★ review by 'James Atkison', 0 thumbs up",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-007",
    "found_date": "2026-10-23",
    "post_date": "2026-09-23",
    "source": "google_play American Home Shield (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.ahs.mobile&reviewId=921db4cb-fde3-46c6-b9a5-0cf548fd9d98",
    "quote": "I paid $120 for a technician to come to my home and inspect my washing machine. After the inspection, I was simply told that the problem was considered “abuse” or improper use and that American Home Shield would not cover the repair.",
    "engagement": "1★ review by 'Orson Echeverria Peche', 0 thumbs up",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   }
  ],
  "proven_models": [],
  "distinct_people": 13,
  "distinct_people_note": "Counted from App Store/Play reviewer names, Reddit authors and X handles in the engagement field; no cross-platform dedup (not verified).",
  "weekly_counts": {
   "2026-W39": 1,
   "2026-W40": 2,
   "2026-W41": 2,
   "2026-W42": 7,
   "2026-W43": 1
  },
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 7,
   "last_week_iso": "2026-W41",
   "last_week": 2,
   "partial_week_W43": 1,
   "note": "US analyst 2026-10-23: counts by post_date over the scout's 30-day window (2026-09-23…2026-10-21); W43 (from Mon 19 Oct) is partial. First US run for these niches (home maintenance, home fitness), so week-over-week growth reflects one night's scouting, not the market."
  },
  "recurring": true,
  "recurring_note": "recurring=true if complaints fall in 3+ consecutive ISO weeks (by post_date). This pain: longest consecutive-week run 5; first US run for this niche, so no earlier-run comparison exists yet.",
  "scores": {
   "frequency": 4,
   "intensity": 5,
   "willingness_to_pay": 2,
   "reachability": 3,
   "buildability": 2,
   "total": 16
  },
  "score_notes": {
   "frequency": "13 complaints across Play, App Store, Reddit and X; low engagement per post (0–3 likes on X).",
   "intensity": "“ASH refused to cover then offered $127 cash in lieu to fix a $2800 problem.” (c-008); “recouping less than $500 of the $2422 I paid for three years of coverage” (c-019).",
   "willingness_to_pay": "They are already over-paying and want out: “After five years, I’ve realized that having a home warranty is completely useless.” (c-029). A tool would be bought per claim, not monthly (assessment).",
   "reachability": "r/homeowners, r/HomeMaintenance; X complaint threads tagging warranty brands.",
   "buildability": "A 'maintenance proof' log is easy, but the real job is getting claims paid, which is adversarial and contract-specific (legal-adjacent, assessment).",
   "method": "US analyst run 2026-10-23."
  },
  "gates": {
   "consumer_subscription": {
    "result": "fail",
    "text": "fail (claims are episodic; a subscription log is a weak proxy)"
   },
   "simplest_way": {
    "result": "borderline",
    "text": "maybe (photo + date per appliance)"
   },
   "us_entry": {
    "result": "pass",
    "text": "pass on mechanics"
   }
  },
  "gate_failed": "consumer_subscription",
  "competitor_veto": false,
  "kill_reason": null,
  "borderline_note": "Near-miss at 16, fails the subscription gate: the most intense home pain tonight, but episodic and adversarial; the proof-log wedge has weak proven demand.",
  "competitors": [
   {
    "name": "Mendstamp (pre-launch)",
    "url": "https://x.com/i/status/2106751906819539061",
    "price": "not public",
    "price_source": null,
    "loves": [],
    "hates": [],
    "loves_hates_note": "X founder post: 'Live soon.'",
    "funding": "unknown"
   },
   {
    "name": "ClaimCairn (pre-launch)",
    "url": "https://x.com/i/status/2105658100883792110",
    "price": "not public",
    "price_source": null,
    "loves": [],
    "hates": [],
    "loves_hates_note": "X founder post: 'Live soon.'",
    "funding": "unknown"
   },
   {
    "name": "HomeZada",
    "url": "https://www.homezada.com/",
    "price": "Freemium (~$99–189/yr per scout source, not verified)",
    "price_source": null,
    "loves": [],
    "hates": [],
    "loves_hates_note": "44 US App Store ratings at 2.86★ (scout).",
    "funding": "$2.1M seed (scout)"
   }
  ],
  "gap": "Intense anger but no recurring job: the proof-log wedge is already being pitched (Mendstamp, ClaimCairn) and the category has failed to show paid demand (HomeZada, Centriq).",
  "plc": {
   "stage": "introduction",
   "evidence": [
    "Home-warranty industry itself is old (American Home Shield app in the stores; scout pulled 25 low AHS reviews), but the consumer 'warranty claim helper / maintenance proof' app category is nascent.",
    "Competitors: two pre-launch X founders in Oct 2026 (Mendstamp, ClaimCairn); older organizers stagnant (HomeZada 44 ratings; Centriq shut down, per pm-us-20261023-04).",
    "Price trend: no established consumer price; organizer tiers ~$99–189/yr unverified (pm-us-20261023-04).",
    "Search/review trend not checked."
   ],
   "verdict": "no",
   "verdictText": "no→maybe (assessment): introduction stage — market must be educated, and the underlying need is episodic, so a subscription is weak.",
   "assessment": true,
   "trendTo": "maybe"
  },
  "verdict": "near-miss"
 },
 {
  "painId": "p-085",
  "night": "2026-10-23",
  "analyst_run": "2026-10-23-us",
  "market": "US",
  "niche": "home maintenance & homeowners",
  "name": null,
  "label": "Being your own repair project manager",
  "pitch": null,
  "price": null,
  "mvp": null,
  "killQuestion": null,
  "description": "US homeowners hate being their own project manager for repairs: contractors ghost small jobs, Taskers cancel last-minute, nobody owns the whole job, and people would pay someone to handle the phone tag and waiting.",
  "who": "US homeowners hiring trades (r/HomeMaintenance; Thumbtack/Taskrabbit/Angi app reviewers)",
  "source": "complaints",
  "evidenceSummary": "10 complaints from 10 people (Reddit 7, App Store 2, Google Play 1).",
  "complaint_ids": [
   "c-us-20261023-009",
   "c-us-20261023-010",
   "c-us-20261023-016",
   "c-us-20261023-018",
   "c-us-20261023-021",
   "c-us-20261023-022",
   "c-us-20261023-023",
   "c-us-20261023-024",
   "c-us-20261023-025",
   "c-us-20261023-026"
  ],
  "quotes": [
   {
    "id": "c-us-20261023-018",
    "found_date": "2026-10-23",
    "post_date": "2026-10-17",
    "source": "reddit r/HomeMaintenance",
    "link": "https://www.reddit.com/r/HomeMaintenance/comments/1x8ey11/storm_took_down_a_20_foot_gutter_run_and_a_strip/",
    "quote": "Is there one kind of company that handles this whole mess, or do I stack the two smaller jobs and play scheduler myself?",
    "engagement": "1 upvotes, 6 comments (archive snapshot), u/Let_Therebe_Chaos",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-024",
    "found_date": "2026-10-23",
    "post_date": "2026-10-17",
    "source": "reddit r/HomeMaintenance (comment)",
    "link": "https://www.reddit.com/r/HomeMaintenance/comments/1x8ey11/storm_took_down_a_20_foot_gutter_run_and_a_strip/phc2xcw/",
    "quote": "this is the most annoying part of home ownership, nobody wants to own the whole job. you end up being the project manager yourself",
    "engagement": "1 upvotes (archive snapshot), u/MysteriouslyAbsorbed",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-021",
    "found_date": "2026-10-23",
    "post_date": "2026-10-06",
    "source": "reddit r/HomeMaintenance (comment)",
    "link": "https://www.reddit.com/r/HomeMaintenance/comments/1wyo2to/this_is_research_for_an_idea_i_thought_of_would/pe4jhde/",
    "quote": "It’d be great if I could hire one person to manage landscaper, cleaner, handyman, plumber, electrician, chimney sweep, hvac repair",
    "engagement": "7 upvotes (archive snapshot), u/loaengineer0",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-022",
    "found_date": "2026-10-23",
    "post_date": "2026-10-06",
    "source": "reddit r/HomeMaintenance (comment)",
    "link": "https://www.reddit.com/r/HomeMaintenance/comments/1wyo2to/this_is_research_for_an_idea_i_thought_of_would/pe4izkf/",
    "quote": "I hate having to micromanage contra tors",
    "engagement": "2 upvotes (archive snapshot), u/No-Cricket-3100",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-023",
    "found_date": "2026-10-23",
    "post_date": "2026-10-06",
    "source": "reddit r/HomeMaintenance (comment)",
    "link": "https://www.reddit.com/r/HomeMaintenance/comments/1wyo2to/this_is_research_for_an_idea_i_thought_of_would/pe4d26v/",
    "quote": "having someone else deal with the phone tag and waiting around would be worth a chunk of change.",
    "engagement": "5 upvotes (archive snapshot), u/limpeffectiveness_2",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-025",
    "found_date": "2026-10-23",
    "post_date": "2026-10-06",
    "source": "reddit r/HomeMaintenance (comment)",
    "link": "https://www.reddit.com/r/HomeMaintenance/comments/1wyo2to/this_is_research_for_an_idea_i_thought_of_would/pe4ra4z/",
    "quote": "As a single woman, I HATE meeting contractors and repairmen for anything.",
    "engagement": "1 upvotes (archive snapshot), u/CandleUnique6387",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-026",
    "found_date": "2026-10-23",
    "post_date": "2026-10-06",
    "source": "reddit r/HomeMaintenance (comment)",
    "link": "https://www.reddit.com/r/HomeMaintenance/comments/1wyo2to/this_is_research_for_an_idea_i_thought_of_would/pe4e5o2/",
    "quote": "I can’t afford a repair person. Much less afford to pay someone to find and watch the repair person.",
    "engagement": "3 upvotes (archive snapshot), u/Suburban--Dad",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-009",
    "found_date": "2026-10-23",
    "post_date": "2026-09-28",
    "source": "google_play Angi (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.servicemagic.consumer&reviewId=240a98f9-0318-4286-8076-dcb16e73d554",
    "quote": "the app shows cancel membership but it's so low on the page it's hidden below the icons on the bottom menu",
    "engagement": "1★ review by 'Randy Barira', 0 thumbs up",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-010",
    "found_date": "2026-10-23",
    "post_date": "2026-09-24",
    "source": "app_store Thumbtack (US storefront)",
    "link": "https://apps.apple.com/us/app/id852703300#review-14587851376",
    "quote": "On the smaller projects less than $500 they either quoted an astronomical price or just don’t respond back to your messages.",
    "engagement": "2★ review by 'DiYRetired', title: 'Ghosted by contractors'",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261023-016",
    "found_date": "2026-10-23",
    "post_date": "2026-09-23",
    "source": "app_store Taskrabbit (US storefront)",
    "link": "https://apps.apple.com/us/app/id374165361#review-14585389604",
    "quote": "there are zero repercussions when a Tasker cancels at the last minute.",
    "engagement": "1★ review by 'ChPs Chang', title: 'Incredibly Unreliable'",
    "niche": "home maintenance & homeowners",
    "stream": "problem",
    "market": "US"
   }
  ],
  "proven_models": [],
  "distinct_people": 10,
  "distinct_people_note": "Counted from App Store/Play reviewer names, Reddit authors and X handles in the engagement field; no cross-platform dedup (not verified).",
  "weekly_counts": {
   "2026-W39": 2,
   "2026-W40": 1,
   "2026-W41": 5,
   "2026-W42": 2
  },
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 2,
   "last_week_iso": "2026-W41",
   "last_week": 5,
   "partial_week_W43": 0,
   "note": "US analyst 2026-10-23: counts by post_date over the scout's 30-day window (2026-09-23…2026-10-21); W43 (from Mon 19 Oct) is partial. First US run for these niches (home maintenance, home fitness), so week-over-week growth reflects one night's scouting, not the market."
  },
  "recurring": true,
  "recurring_note": "recurring=true if complaints fall in 3+ consecutive ISO weeks (by post_date). This pain: longest consecutive-week run 4; first US run for this niche, so no earlier-run comparison exists yet.",
  "scores": {
   "frequency": 3,
   "intensity": 4,
   "willingness_to_pay": 3,
   "reachability": 3,
   "buildability": 1,
   "total": 14
  },
  "score_notes": {
   "frequency": "10 complaints, mostly one r/HomeMaintenance thread with 1–7 upvotes per comment.",
   "intensity": "“this is the most annoying part of home ownership, nobody wants to own the whole job. you end up being the project manager yourself” (c-024).",
   "willingness_to_pay": "Some: “having someone else deal with the phone tag and waiting around would be worth a chunk of change.” (c-023); but “I can’t afford a repair person. Much less afford to pay someone to find and watch the repair person.” (c-026).",
   "reachability": "r/HomeMaintenance, r/homeowners.",
   "buildability": "This is a local concierge/ops service (vetting trades, being on site), not an app a Berlin-based solo dev can run in the US.",
   "method": "US analyst run 2026-10-23."
  },
  "gates": {
   "consumer_subscription": {
    "result": "fail",
    "text": "fail (service business)"
   },
   "simplest_way": {
    "result": "not-assessed",
    "text": "n/a"
   },
   "us_entry": {
    "result": "fail",
    "text": "fail (needs local presence)"
   }
  },
  "gate_failed": "buildability / us_entry",
  "competitor_veto": false,
  "kill_reason": null,
  "borderline_note": null,
  "competitors": [],
  "gap": "Ops-heavy local service; Angi/Thumbtack/Taskrabbit own the marketplace layer.",
  "plc": null,
  "verdict": "below-bar"
 },
 {
  "painId": "p-086",
  "night": "2026-10-24",
  "analyst_run": "2026-10-24-us",
  "market": "US",
  "niche": "kids' activities & school logistics",
  "name": null,
  "label": "School & activity message overload",
  "pitch": null,
  "price": null,
  "mvp": null,
  "killQuestion": null,
  "description": "US parents drown in school and activity messages spread across many apps (ParentSquare, ClassDojo, Seesaw, Remind, PowerSchool, BAND, email): district noise buries classroom posts, there is no filter or search, and families with kids at different schools juggle separate accounts and miss notices. They want one feed per family that pulls out what matters.",
  "who": "US K-12 parents, especially with 2+ kids at different schools (US App Store/Play reviewers of ParentSquare, Bloomz, ClassDojo, Seesaw, Remind, PowerSchool; r/Mommit, r/Parenting; X parents in CA, TX, CO, LA)",
  "source": "complaints+proven-model",
  "evidenceSummary": "23 complaints from 23 people (App Store 11, Google Play 5, X 5, Reddit 2); proven model ClassDojo Plus.",
  "complaint_ids": [
   "c-us-20261024-001",
   "c-us-20261024-012",
   "c-us-20261024-013",
   "c-us-20261024-014",
   "c-us-20261024-015",
   "c-us-20261024-022",
   "c-us-20261024-023",
   "c-us-20261024-029",
   "c-us-20261024-030",
   "c-us-20261024-031",
   "c-us-20261024-032",
   "c-us-20261024-033",
   "c-us-20261024-034",
   "c-us-20261024-035",
   "c-us-20261024-036",
   "c-us-20261024-041",
   "c-us-20261024-044",
   "c-us-20261024-045",
   "c-us-20261024-050",
   "c-us-20261024-051",
   "c-us-20261024-052",
   "c-us-20261024-054",
   "c-us-20261024-055"
  ],
  "quotes": [
   {
    "id": "c-us-20261024-036",
    "found_date": "2026-10-24",
    "post_date": "2026-10-21",
    "source": "app_store ParentSquare (US storefront)",
    "link": "https://apps.apple.com/us/app/id908126679#review-14692947217",
    "quote": "district postings and building postings when I JUST WANT THE CLASSROOM POSTS.",
    "engagement": "1★ review by 'MagPi1030', title: 'There’s way better parent communication apps'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-034",
    "found_date": "2026-10-24",
    "post_date": "2026-10-20",
    "source": "app_store ParentSquare (US storefront)",
    "link": "https://apps.apple.com/us/app/id908126679#review-14690251964",
    "quote": "I have two girls that go to two different schools plus do online learning so I have I believe four different locations that messages show up.",
    "engagement": "2★ review by '10Jem', title: 'So-so. I can’t find anything.'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-035",
    "found_date": "2026-10-24",
    "post_date": "2026-10-20",
    "source": "app_store ParentSquare (US storefront)",
    "link": "https://apps.apple.com/us/app/id908126679#review-14690607505",
    "quote": "Now I get emails to check an app. It’s extra and I forget and I miss messages.",
    "engagement": "1★ review by 'MomRJF', title: 'I don’t need another app'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-033",
    "found_date": "2026-10-24",
    "post_date": "2026-10-19",
    "source": "app_store ParentSquare (US storefront)",
    "link": "https://apps.apple.com/us/app/id908126679#review-14686303391",
    "quote": "I wish I could delete about 75% of the posts that don’t apply to my family.",
    "engagement": "3★ review by 'Molly Pifer', title: 'Works well, but no delete?'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-045",
    "found_date": "2026-10-24",
    "post_date": "2026-10-16",
    "source": "reddit r/Parenting (comment)",
    "link": "https://www.reddit.com/r/Parenting/comments/1x73vxo/skylight_calendar/ph0yza9/",
    "quote": "Sidekick from school emails is clunky as hell. I upload to iCal and then adjust it. Which feels like too many steps.",
    "engagement": "2 upvotes (archive snapshot), u/gore_schach",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-023",
    "found_date": "2026-10-24",
    "post_date": "2026-10-10",
    "source": "app_store ClassDojo (US storefront)",
    "link": "https://apps.apple.com/us/app/id552602056#review-14651655517",
    "quote": "Students are in multiple classes, with no way to filter by class. Teachers use it for important announcements, but there’s no search function",
    "engagement": "2★ review by 'elijahberto', title: 'Mediocre'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-015",
    "found_date": "2026-10-24",
    "post_date": "2026-10-08",
    "source": "google_play Remind (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.remind101&reviewId=633b9141-d166-4c56-99de-3307b2c11315",
    "quote": "It's free, that's why teachers use it. I wish there was another option that allowed more user control.",
    "engagement": "2★ review by 'Anthony P', 1 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-022",
    "found_date": "2026-10-24",
    "post_date": "2026-10-07",
    "source": "app_store ClassDojo (US storefront)",
    "link": "https://apps.apple.com/us/app/id552602056#review-14639792457",
    "quote": "I don’t need 50 plus emails a day about every little thing that has nothing to do with my kid.",
    "engagement": "1★ review by 'Unhappy customer 404', title: 'Garbage'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-054",
    "found_date": "2026-10-24",
    "post_date": "2026-10-07",
    "source": "x",
    "link": "https://x.com/tacosyum1974/status/2107905479435600189",
    "quote": "I work in tech and I hate that everything has an app. I especially hate that my kids sports use the dumb band app, then they don’t keep it updated",
    "engagement": "@tacosyum1974 (location: Colorado, USA), 5 likes, 1 replies",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-012",
    "found_date": "2026-10-24",
    "post_date": "2026-10-06",
    "source": "google_play ParentSquare (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.parentsquare.psapp&reviewId=7843a9d8-c66b-432a-af6c-87b9558cf169",
    "quote": "awfully hard to use, especially with multiple kids. why is it so hard to find my sign ups? add them to the calendar feature you already have!",
    "engagement": "1★ review by 'Ben Jensen', 2 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-044",
    "found_date": "2026-10-24",
    "post_date": "2026-10-06",
    "source": "reddit r/Mommit",
    "link": "https://www.reddit.com/r/Mommit/comments/1wz2avx/need_advice_for_flaky_parents_on_my_sons_birthday/",
    "quote": "My oldest started kindergarten this year and it’s been a whirlwind of emails, texts, and other communications sent to us literally constantly.",
    "engagement": "0 upvotes, 63 comments (archive snapshot), u/FlamingoSprinkles025",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-041",
    "found_date": "2026-10-24",
    "post_date": "2026-10-05",
    "source": "app_store Here Comes the Bus (US storefront)",
    "link": "https://apps.apple.com/us/app/id981902595#review-14630183923",
    "quote": "We have 2 kids in different schools and it’s doesn’t work.",
    "engagement": "1★ review by 'Alonfiiii', title: 'Doesn’t work anymore'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-013",
    "found_date": "2026-10-24",
    "post_date": "2026-10-02",
    "source": "google_play PowerSchool Mobile (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.powerschool.portal&reviewId=fa2a5b5c-f65c-4fb3-9632-3d571946f618",
    "quote": "I have two kids in two different school districts, and I have to have two different passwords and user accounts.",
    "engagement": "3★ review by 'Allison Plante', 0 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-001",
    "found_date": "2026-10-24",
    "post_date": "2026-10-01",
    "source": "google_play Bloomz (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=net.bloomz&reviewId=5310e8e3-6068-4d31-88e5-8b7895417171",
    "quote": "I don't understand why we have to have another app for school that wants us to pay for the full version. I wish they would just pick one app and stick with it.",
    "engagement": "3★ review by 'Book Zombie', 0 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-031",
    "found_date": "2026-10-24",
    "post_date": "2026-09-29",
    "source": "app_store ParentSquare (US storefront)",
    "link": "https://apps.apple.com/us/app/id908126679#review-14608829801",
    "quote": "as a parent of 3, in three different schools, I would like to see a feed view that shows everything from all my children’s schools.",
    "engagement": "3★ review by 'Aodjrdbhxs', title: 'Consolidated view'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-032",
    "found_date": "2026-10-24",
    "post_date": "2026-09-29",
    "source": "app_store ParentSquare (US storefront)",
    "link": "https://apps.apple.com/us/app/id908126679#review-14607420867",
    "quote": "too many district wide notifications which causes important notifications from the teacher yo get lost in the shuffle.",
    "engagement": "3★ review by 'siennamisty', title: 'Newsfeed'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-050",
    "found_date": "2026-10-24",
    "post_date": "2026-09-29",
    "source": "x",
    "link": "https://x.com/justsome_np/status/2104723906934485452",
    "quote": "Daughter is in kindergarten and I have to have 4 different school apps, this is no exaggeration at all, it’s totally out of control",
    "engagement": "@justsome_np (location: California), 9 likes, 3 replies",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-055",
    "found_date": "2026-10-24",
    "post_date": "2026-09-29",
    "source": "x",
    "link": "https://x.com/fosterdadlance/status/2104976558486388918",
    "quote": "My kid graduated. I can’t stop getting daily notifications from Schoology because they deleted my access apparently the day he finished. Tech support says all I can do is mark it junk.",
    "engagement": "@fosterdadlance (location: Los Angeles), 5 likes, 0 replies",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-030",
    "found_date": "2026-10-24",
    "post_date": "2026-09-28",
    "source": "app_store ParentSquare (US storefront)",
    "link": "https://apps.apple.com/us/app/id908126679#review-14605516064",
    "quote": "When you have 2-4 kids in 2-3 different schools this app is a waste of time.",
    "engagement": "1★ review by 'talyaseyes', title: 'Annoying'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-029",
    "found_date": "2026-10-24",
    "post_date": "2026-09-27",
    "source": "app_store ParentSquare (US storefront)",
    "link": "https://apps.apple.com/us/app/id908126679#review-14600906428",
    "quote": "God forbid you have kids at different schools, you will miss notifications.",
    "engagement": "1★ review by 'Pill rusher', title: 'Multiple Kids at Multiple Schools'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-052",
    "found_date": "2026-10-24",
    "post_date": "2026-09-27",
    "source": "x",
    "link": "https://x.com/bethanyjbabcock/status/2104139251226935790",
    "quote": "If I could get it to monitor all the parent chats, emails and the kids’ school apps I could finally look like I have my life together.",
    "engagement": "@bethanyjbabcock (location: Austin & San Antonio, TX), 19 likes, 6 replies",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-051",
    "found_date": "2026-10-24",
    "post_date": "2026-09-26",
    "source": "x",
    "link": "https://x.com/badbirb/status/2103660599771267385",
    "quote": "A great application would be something that declutters all the crap the school apps send you.  School sends out 10 notices per week per child - the AI tells offers to add the kids sports games and meetings to your calendar and gives you a summary of everything else.... done.\n\nI got 6 kids and I get a literal flood of crap from the schools every week, with maybe 1 or 2 relevent things in it from 50+ messages.",
    "engagement": "@badbirb (location: United States), 7 likes, 1 replies",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-014",
    "found_date": "2026-10-24",
    "post_date": "2026-09-24",
    "source": "google_play Seesaw (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=seesaw.shadowpuppet.co.classroom&reviewId=32462a64-a19e-441c-83d3-5743fe7954dd",
    "quote": "I have 2 kids in the same school but cannot change between the 2 so I have to choose which child I want the notifications from",
    "engagement": "1★ review by 'Jen', 0 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   }
  ],
  "proven_models": [
   {
    "id": "pm-us-20261024-02",
    "found_date": "2026-10-24",
    "app": "ClassDojo Plus (school-parent messaging upsell)",
    "country": "US",
    "model_and_price": "Free for schools; parents upsold to ClassDojo Plus. $7.99/mo or $59.99/yr per Forbes 2022 (https://www.forbes.com/sites/alexkonrad/2022/07/21/classdojo-tencent-backed-unicorn-launches-education-virtual-world/); US reviewers tonight cite $70–100/yr and ~$10/mo (user-reported).",
    "traction_evidence": "Profitable months after launching paid Plus; revenue tripled in 2020 with hundreds of thousands of paying families (https://techcrunch.com/2021/01/26/classdojos-second-act-comes-with-first-profits/ ; https://www.prnewswire.com/news-releases/as-education-shifts-online-classdojo-serves-51-million-students-worldwide-announces-profitability-and-new-solo-capitalist-funding-301216471.html).",
    "us_status": "Huge US install base; parents resent that calendar sync, photo saving and history beyond 7 days sit behind Plus: https://apps.apple.com/us/app/id552602056#review-14588062550 ; https://apps.apple.com/us/app/id552602056#review-14690390628 ; https://x.com/rickasaurus/status/2105291611001241882",
    "entry_point": "Proof that parents pay for school-communication convenience. An outside tool can't read ClassDojo data (no public parent API), so a solo dev's angle would be a cross-app parent inbox fed by email notifications (Paddle/Polar subscription). Assessment.",
    "why_not_done_yet": "Partly being done: AI school-email assistants (Muse, Calo, ParentBench and DIY agent setups seen on X tonight) are chasing the same multi-app overload. Data access via email forwarding only. Assessment.",
    "lifecycle_evidence": "Mature freemium squeezing the base: repeated upsell questionnaires and paywalled basics drive 1★ reviews tonight. Assessment.",
    "stream": "proven-model",
    "market": "US"
   }
  ],
  "distinct_people": 23,
  "distinct_people_note": "Counted from App Store/Play reviewer names, Reddit authors and X handles in the engagement field; no cross-platform dedup (not verified).",
  "weekly_counts": {
   "2026-W39": 4,
   "2026-W40": 7,
   "2026-W41": 7,
   "2026-W42": 1,
   "2026-W43": 4
  },
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 1,
   "last_week_iso": "2026-W41",
   "last_week": 7,
   "partial_week_W43": 4,
   "new_complaints_this_run": 23,
   "note": "US analyst 2026-10-24: counts by post_date over all linked complaints (scout windows 2026-09-22…2026-10-21 and 2026-09-24…2026-10-21); W43 (from Mon 19 Oct) is partial. Growth reflects nights of scouting, not the market."
  },
  "recurring": true,
  "recurring_note": "recurring=true if complaints fall in 3+ consecutive ISO weeks (by post_date). This pain: longest consecutive-week run 5. Scout runs that surfaced it: 2026-10-24.",
  "scores": {
   "frequency": 5,
   "intensity": 4,
   "willingness_to_pay": 3,
   "reachability": 4,
   "buildability": 3,
   "total": 19
  },
  "score_notes": {
   "frequency": "23 complaints, the largest cluster tonight (ParentSquare alone 8 US App Store reviews; X posts with 19 and 9 likes, c-052, c-050). Proven demand: ClassDojo Plus reached profitability with hundreds of thousands of paying families (pm-us-20261024-02, TechCrunch 2021).",
   "intensity": "“Daughter is in kindergarten and I have to have 4 different school apps, this is no exaggeration at all, it’s totally out of control” (c-050, https://x.com/justsome_np/status/2104723906934485452); “God forbid you have kids at different schools, you will miss notifications.” (c-029, https://apps.apple.com/us/app/id908126679#review-14600906428); “Now I get emails to check an app. It’s extra and I forget and I miss messages.” (c-035, https://apps.apple.com/us/app/id908126679#review-14690607505)",
   "willingness_to_pay": "Mixed: parents pay for convenience (ClassDojo Plus, Skylight Plus $79/yr with >50% attach per pm-us-20261024-03), and EmailSnapshot sells a digest at $9–24/mo (sources.md). But school-app complainers expect it free: “It needs to be free from the schools. Get your own app, we pay the Texas schools tons through taxes” (c-003, https://play.google.com/store/apps/details?id=com.classdojo.android&reviewId=36ab9918-c042-447e-bd02-fd2d0fb7abf7).",
   "reachability": "Concentrated: r/Mommit, r/Parenting, r/daddit, App Store keywords 'parentsquare', 'school app'; back-to-school seasonality (assessment).",
   "buildability": "Email-forwarding inbox + LLM extraction + daily digest + calendar feed is a 2-week MVP; reading app-only messages (ClassDojo, ParentSquare in-app) is not possible without APIs (assessment).",
   "method": "US analyst run 2026-10-24. c-NNN = c-us-20261024-NNN."
  },
  "gates": {
   "consumer_subscription": {
    "result": "pass",
    "text": "pass (EmailSnapshot, Skylight Plus/Assistant, Cozi Max sell this as a subscription)"
   },
   "simplest_way": {
    "result": "pass",
    "text": "pass after one-time forwarding setup: open the morning digest, done in seconds"
   },
   "us_entry": {
    "result": "pass",
    "text": "pass on mechanics (r/Mommit/r/Parenting, App Store keyword, Paddle/Polar/Lemon Squeezy in USD)"
   }
  },
  "gate_failed": null,
  "competitor_veto": true,
  "kill_reason": "Competitor veto (score 19, all gates pass). The exact product — one AI digest of all school/activity email per family — is already sold or funded: (1) Fambot, $3.5M pre-seed (NextView, Baukunst), launched 1 Sep 2026 with 1,000+ families, free in beta, reads Gmail/Outlook/WhatsApp without forwarding; (2) Ohai.ai, Care.com founder, NEA/Eniac seed plus Muse Capital round, 67,000+ school calendars; (3) Skylight Sidekick (Calendar Plus $79/yr; Skylight Assistant $119.99/yr) on 1.7M Calendar households; (4) Cozi Max $79/yr turns emails into events; (5) indie EmailSnapshot ($9–24/mo), Parently (30 free digests), FamilyGenie (free beta). A Berlin solo dev would launch into a funded, free-in-beta field with no data access the others lack.",
  "borderline_note": "Highest-scoring new pain tonight (19) but killed only by the competitor veto: Fambot, Ohai, Skylight Sidekick, Cozi Max and indie digests already do it.",
  "competitors": [
   {
    "name": "Fambot",
    "url": "https://fambot.com/",
    "price": "Free while in beta (press release, 1 Sep 2026)",
    "price_source": "https://fambot.com/press-releases/fambot-launches-ai-chief-of-staff-for-families",
    "loves": [],
    "hates": [],
    "user_reviews": "not fetched tonight (launched Sep 2026)",
    "funding": "$3.5M pre-seed, NextView + Baukunst (https://www.wsgr.com/en/insights/wilson-sonsini-advises-fambot-on-dollar35-million-pre-seed-funding.html)"
   },
   {
    "name": "Skylight Calendar Plus / Skylight Assistant (Sidekick email import)",
    "url": "https://myskylight.com/products/calendar-skylight-plus",
    "price": "Calendar Plus $79/yr; Assistant $14.99/mo or $119.99/yr",
    "price_source": "https://skylight.zendesk.com/hc/en-us/articles/51833126965019-Subscription",
    "loves": [],
    "hates": [
     {
      "quote": "Sidekick from school emails is clunky as hell. I upload to iCal and then adjust it. Which feels like too many steps.",
      "who": "u/gore_schach, r/Parenting comment (c-045)",
      "link": "https://www.reddit.com/r/Parenting/comments/1x73vxo/skylight_calendar/ph0yza9/"
     }
    ],
    "funding": "Bootstrapped; $75M credit facility; 1.7M Calendar households (pm-us-20261024-03, PR Newswire)"
   },
   {
    "name": "Ohai.ai",
    "url": "https://www.prnewswire.com/news-releases/ohaiai-raises-strategic-investment-led-by-muse-capital-celebrity-and-executive-mothers-to-save-parents-hours-of-mental-load-302533511.html",
    "price": "not checked tonight",
    "price_source": null,
    "loves": [],
    "hates": [],
    "funding": "NEA, Eniac, LifeX seed + Muse Capital strategic round (Aug 2025)"
   },
   {
    "name": "Cozi Max",
    "url": "https://www.cozi.com/compare-plans/",
    "price": "Gold $39/yr; Max $79/yr (AI email-to-calendar)",
    "price_source": "https://www.cozi.com/compare-plans/",
    "loves": [],
    "hates": [],
    "funding": "not checked; 399,369 US App Store ratings per a third-party comparison (gethomsy.com, 24 Sep 2026)"
   },
   {
    "name": "EmailSnapshot",
    "url": "https://emailsnapshot.com/",
    "price": "$9/mo Personal, $18/mo Family, $24/mo Pro (7-day trial)",
    "price_source": "https://emailsnapshot.com/",
    "loves": [],
    "hates": [],
    "user_reviews": "only on-site testimonials (not independent)",
    "funding": "solo founder per site"
   }
  ],
  "gap": "Only app-locked messages (ClassDojo/ParentSquare in-app posts that never hit email) remain uncovered, and nobody, including a solo dev, can read those without school-app APIs. Everything reachable via email is already covered by funded players.",
  "plc": {
   "stage": "introduction",
   "evidence": [
    "Category age: AI school-email digests are new — Fambot launched 1 Sep 2026 (TechCrunch https://techcrunch.com/2026/09/01/fambot-introduces-an-ai-chief-of-staff-for-families/); Ohai school-calendar sync launched Aug 2025 (PR Newswire link above).",
    "Competitor count/trend: rising — Fambot, Ohai, Skylight Sidekick, Cozi Max, EmailSnapshot, Parently, FamilyGenie, plus 'AI school-email assistants (Muse, Calo, ParentBench)' seen on X by the scout (pm-us-20261024-02).",
    "Recent funding: Fambot $3.5M pre-seed (Sep 2026); Ohai strategic round (Aug 2025); Skylight credit facility expanded to $75M (pm-us-20261024-03).",
    "Price trend: up — Skylight Plus $39→$79/yr with >50% attach (gtmsauce link in pm-us-20261024-03); new $119.99/yr Assistant tier; Cozi added a $79/yr Max tier.",
    "Review trend: 23 school-comms complaints in 30 days tonight. Search trend not checked (no Google Trends access)."
   ],
   "verdict": "maybe",
   "verdictText": "maybe (assessment): the stage supports paid subscriptions (price rises stick), but funded and incumbent players got there first; parents must still be educated that a digest exists.",
   "assessment": true,
   "stageText": "introduction→growth"
  },
  "verdict": "near-miss"
 },
 {
  "painId": "p-087",
  "night": "2026-10-24",
  "analyst_run": "2026-10-24-us",
  "market": "US",
  "niche": "kids' activities & school logistics",
  "name": null,
  "label": "ClassDojo Plus resentment",
  "pitch": null,
  "price": null,
  "mvp": null,
  "killQuestion": null,
  "description": "US parents resent ClassDojo pushing ClassDojo Plus (~$70–100/yr user-reported): upsell questionnaires before reading a teacher's message, and calendar sync, photo saving and history beyond 7 days behind the paywall, for an app the school chose.",
  "who": "US parents whose child's teacher uses ClassDojo (US App Store/Play reviewers; X)",
  "source": "complaints",
  "evidenceSummary": "8 complaints from 8 people (Google Play 4, App Store 3, X 1).",
  "complaint_ids": [
   "c-us-20261024-002",
   "c-us-20261024-003",
   "c-us-20261024-004",
   "c-us-20261024-005",
   "c-us-20261024-021",
   "c-us-20261024-024",
   "c-us-20261024-025",
   "c-us-20261024-053"
  ],
  "quotes": [
   {
    "id": "c-us-20261024-025",
    "found_date": "2026-10-24",
    "post_date": "2026-10-20",
    "source": "app_store ClassDojo (US storefront)",
    "link": "https://apps.apple.com/us/app/id552602056#review-14690390628",
    "quote": "After a giant tuition payment to a school, the last thing I want to hear from a 3rd party app company is that they would also like $10/month.",
    "engagement": "1★ review by 'ff0000d', title: 'please stop'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-005",
    "found_date": "2026-10-24",
    "post_date": "2026-10-19",
    "source": "google_play ClassDojo (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.classdojo.android&reviewId=84a2226d-6d20-4703-a003-c1f096de09dc",
    "quote": "I can't afford to pay $70.00 a year or more to make it more user friendly than the bare bones basic version.",
    "engagement": "2★ review by 'Victoria Christison', 0 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-024",
    "found_date": "2026-10-24",
    "post_date": "2026-10-13",
    "source": "app_store ClassDojo (US storefront)",
    "link": "https://apps.apple.com/us/app/id552602056#review-14661394509",
    "quote": "I cannot see anything prior to the past 7 days unless I pay.",
    "engagement": "1★ review by 'Constant Promotions- Unhappy', title: 'SO many ads, NOT truly free'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-004",
    "found_date": "2026-10-24",
    "post_date": "2026-10-07",
    "source": "google_play ClassDojo (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.classdojo.android&reviewId=1bd8a891-f8ca-4b45-a2c6-e0c71029fb24",
    "quote": "it feels like I have to walk by a beggar who will only take $70 or $100 every time I want to talk to my kid's teacher.",
    "engagement": "2★ review by 'Zakk Broadbent', 1 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-003",
    "found_date": "2026-10-24",
    "post_date": "2026-10-02",
    "source": "google_play ClassDojo (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.classdojo.android&reviewId=36ab9918-c042-447e-bd02-fd2d0fb7abf7",
    "quote": "It needs to be free from the schools. Get your own app, we pay the Texas schools tons through taxes",
    "engagement": "1★ review by 'Wesley Franks', 2 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-053",
    "found_date": "2026-10-24",
    "post_date": "2026-09-30",
    "source": "x",
    "link": "https://x.com/rickasaurus/status/2105291611001241882",
    "quote": "The @ClassDojo grift is getting out of control. If they keep pushing we’re going to start pushing the school board to adopt different software.",
    "engagement": "@rickasaurus (location: NYC), 0 likes, 0 replies",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-002",
    "found_date": "2026-10-24",
    "post_date": "2026-09-24",
    "source": "google_play ClassDojo (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.classdojo.android&reviewId=48fe082d-2057-4f3d-9556-73078e9fdf7a",
    "quote": "I get a notification from my son's teacher but then I get prompted with 30 questions from the app about what I want to work on with my son before I can read the message.",
    "engagement": "1★ review by 'Troy', 2 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-021",
    "found_date": "2026-10-24",
    "post_date": "2026-09-24",
    "source": "app_store ClassDojo (US storefront)",
    "link": "https://apps.apple.com/us/app/id552602056#review-14588062550",
    "quote": "syncing your calendar or adding events from the app requires a paid subscription. All of these features could be done with free software.",
    "engagement": "2★ review by 'DanManMan', title: 'Aggressively pushes for subscription'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   }
  ],
  "proven_models": [],
  "distinct_people": 8,
  "distinct_people_note": "Counted from App Store/Play reviewer names, Reddit authors and X handles in the engagement field; no cross-platform dedup (not verified).",
  "weekly_counts": {
   "2026-W39": 2,
   "2026-W40": 2,
   "2026-W41": 1,
   "2026-W42": 1,
   "2026-W43": 2
  },
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 1,
   "last_week_iso": "2026-W41",
   "last_week": 1,
   "partial_week_W43": 2,
   "new_complaints_this_run": 8,
   "note": "US analyst 2026-10-24: counts by post_date over all linked complaints (scout windows 2026-09-22…2026-10-21 and 2026-09-24…2026-10-21); W43 (from Mon 19 Oct) is partial. Growth reflects nights of scouting, not the market."
  },
  "recurring": true,
  "recurring_note": "recurring=true if complaints fall in 3+ consecutive ISO weeks (by post_date). This pain: longest consecutive-week run 5. Scout runs that surfaced it: 2026-10-24.",
  "scores": {
   "frequency": 4,
   "intensity": 4,
   "willingness_to_pay": 1,
   "reachability": 3,
   "buildability": 1,
   "total": 13
  },
  "score_notes": {
   "frequency": "8 complaints in 30 days; ClassDojo has a huge US base (pm-us-20261024-02).",
   "intensity": "“it feels like I have to walk by a beggar who will only take $70 or $100 every time I want to talk to my kid's teacher.” (c-004, https://play.google.com/store/apps/details?id=com.classdojo.android&reviewId=1bd8a891-f8ca-4b45-a2c6-e0c71029fb24); “I get a notification from my son's teacher but then I get prompted with 30 questions from the app about what I want to work on with my son before I can read the message.” (c-002, https://play.google.com/store/apps/details?id=com.classdojo.android&reviewId=48fe082d-2057-4f3d-9556-73078e9fdf7a)",
   "willingness_to_pay": "They refuse to pay a third party for school contact: “After a giant tuition payment to a school, the last thing I want to hear from a 3rd party app company is that they would also like $10/month.” (c-025, https://apps.apple.com/us/app/id552602056#review-14690390628); “It needs to be free from the schools. Get your own app, we pay the Texas schools tons through taxes” (c-003, https://play.google.com/store/apps/details?id=com.classdojo.android&reviewId=36ab9918-c042-447e-bd02-fd2d0fb7abf7)",
   "reachability": "Parents are everywhere but the only lever is the school's choice of app (c-053, school board).",
   "buildability": "No public parent API to ClassDojo data; a replacement must be adopted by teachers, not sold to parents (assessment).",
   "method": "US analyst run 2026-10-24."
  },
  "gates": {
   "consumer_subscription": {
    "result": "fail",
    "text": "fail: the complaint is about being asked to pay; the product decision sits with schools"
   },
   "simplest_way": {
    "result": "not-assessed",
    "text": "n/a"
   },
   "us_entry": {
    "result": "fail",
    "text": "fail: B2B/school adoption"
   }
  },
  "gate_failed": "consumer_subscription",
  "competitor_veto": false,
  "kill_reason": "Below bar (13) and fails the consumer-subscription gate; overlaps p-086 for the only buildable angle.",
  "borderline_note": null,
  "competitors": [],
  "gap": null,
  "plc": null,
  "verdict": "below-bar"
 },
 {
  "painId": "p-088",
  "night": "2026-10-24",
  "analyst_run": "2026-10-24-us",
  "market": "US",
  "niche": "kids' activities & school logistics",
  "name": null,
  "label": "GameChanger & Hudl price hikes",
  "pitch": null,
  "price": null,
  "mvp": null,
  "killQuestion": null,
  "description": "US youth-sports families feel squeezed by GameChanger (and Hudl): free viewing cut, Premium up to ~$100/yr, ads shown even to paying subscribers, home teams charging extra per game, and facilities pushing their own cameras instead of parents' equipment.",
  "who": "US parents and grandparents of youth baseball/softball and school-sports players (US App Store/Play reviewers of GameChanger and Hudl; r/GameChangerApp)",
  "source": "complaints+proven-model",
  "evidenceSummary": "11 complaints from 11 people (Google Play 6, App Store 3, Reddit 2); proven model GameChanger.",
  "complaint_ids": [
   "c-us-20261024-006",
   "c-us-20261024-007",
   "c-us-20261024-008",
   "c-us-20261024-009",
   "c-us-20261024-010",
   "c-us-20261024-011",
   "c-us-20261024-026",
   "c-us-20261024-027",
   "c-us-20261024-028",
   "c-us-20261024-047",
   "c-us-20261024-049"
  ],
  "quotes": [
   {
    "id": "c-us-20261024-049",
    "found_date": "2026-10-24",
    "post_date": "2026-10-20",
    "source": "reddit r/GameChangerApp",
    "link": "https://www.reddit.com/r/GameChangerApp/comments/1xb3b09/mevo_multicam_at_facility_with_gamechanger_qr_code/",
    "quote": "It's ridiculous we're no longer allowed to use our own equipment",
    "engagement": "4 upvotes, 13 comments (archive snapshot), u/Content_Ad8098",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-010",
    "found_date": "2026-10-24",
    "post_date": "2026-10-18",
    "source": "google_play GameChanger (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.gc.teammanager&reviewId=c5a444b9-cb07-47d4-b707-1ea552fe6f0d",
    "quote": "I didn't realize that you get absolutely NOTHING for free anymore. You can't even listen to the game without paying now?",
    "engagement": "1★ review by 'Dana fuller', 1 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-028",
    "found_date": "2026-10-24",
    "post_date": "2026-10-18",
    "source": "app_store GameChanger (US storefront)",
    "link": "https://apps.apple.com/us/app/id1308415878#review-14682371674",
    "quote": "I pay $99 for this app. I don’t pay to watch your stupid ads.",
    "engagement": "1★ review by 'Mtn Thyme', title: 'ADS????'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-047",
    "found_date": "2026-10-24",
    "post_date": "2026-10-18",
    "source": "reddit r/GameChangerApp",
    "link": "https://www.reddit.com/r/GameChangerApp/comments/1x94fyc/ads/",
    "quote": "So people already pay too much for this pos app and now you add advertising onto live video?",
    "engagement": "38 upvotes, 16 comments (archive snapshot), u/6828OldPascoK5",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-011",
    "found_date": "2026-10-24",
    "post_date": "2026-10-17",
    "source": "google_play Hudl (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.hudl.hudroid&reviewId=a39f3cb7-fa13-48fc-9950-d7eda4908170",
    "quote": "I paid full subscription but only get to see half the season games because the home team has the option to charge more money to see the game.",
    "engagement": "1★ review by 'Alex Crabtree', 0 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-009",
    "found_date": "2026-10-24",
    "post_date": "2026-10-13",
    "source": "google_play GameChanger (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.gc.teammanager&reviewId=e0d1670e-e3d8-4d43-bbf6-4e5d48e92c96",
    "quote": "they need to make family free. I don't wanna pay 250$ a season!",
    "engagement": "3★ review by 'Arlo Gammill', 1 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-007",
    "found_date": "2026-10-24",
    "post_date": "2026-10-11",
    "source": "google_play GameChanger (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.gc.teammanager&reviewId=1b0f1d38-b36b-413a-8fb2-4afaea7ec076",
    "quote": "My choice now is either to get a $90 charge for a yearly Premium subscription or cancel",
    "engagement": "1★ review by 'John Bodnar', 0 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-008",
    "found_date": "2026-10-24",
    "post_date": "2026-10-11",
    "source": "google_play GameChanger (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.gc.teammanager&reviewId=306ea2ec-1712-4938-9614-3ffd4c3ea9a1",
    "quote": "Charging $100/yr for Premium Subscription to get your own kid's stats is absurd!",
    "engagement": "1★ review by 'Eddy Jackson', 0 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-027",
    "found_date": "2026-10-24",
    "post_date": "2026-10-04",
    "source": "app_store GameChanger (US storefront)",
    "link": "https://apps.apple.com/us/app/id1308415878#review-14626719184",
    "quote": "Bring back free streaming, and quit raising the price.",
    "engagement": "1★ review by 'sgtguthrie', title: 'Dick’s ruined it'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-006",
    "found_date": "2026-10-24",
    "post_date": "2026-09-28",
    "source": "google_play GameChanger (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.gc.teammanager&reviewId=9d889fe1-1cbe-4af3-be6f-3ca8f5e6d3d9",
    "quote": "Pay for family plan because can't watch games without paying anymore. Ads shown every half inning.",
    "engagement": "1★ review by 'Wes Fawcett', 0 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-026",
    "found_date": "2026-10-24",
    "post_date": "2026-09-26",
    "source": "app_store GameChanger (US storefront)",
    "link": "https://apps.apple.com/us/app/id1308415878#review-14596959960",
    "quote": "Looks like the recent version has started showing ads in the live stream even for paid subscribers.  That’s after they raised the price for the annual subscription too.",
    "engagement": "3★ review by 'bluedonkey', title: 'Ads for Paid Subscribers Now?'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   }
  ],
  "proven_models": [
   {
    "id": "pm-us-20261024-01",
    "found_date": "2026-10-24",
    "app": "GameChanger (youth sports scoring + live streaming)",
    "country": "US",
    "model_and_price": "Free team/scoring app; families pay to watch and see stats. Plus $39.99/yr, Premium $99.99/yr; free viewing limited to 5 games (https://help.gc.com/hc/en-us/articles/28521445314957-Individual-Subscription-FAQs). Reviews tonight also cite monthly family plans (~$25/mo, user-reported).",
    "traction_evidence": "Owned by DICK'S Sporting Goods; FY25 revenue close to $150M, ~40% CAGR since 2017, ~10M unique active users, 4M+ average MAU (https://youthsportsbusinessreport.com/dicks-youth-sports-ecosystem-holds-the-line-as-foot-locker-losses-force-a-guidance-cut/ ; https://www.investing.com/news/analyst-ratings/baird-reiterates-dicks-sporting-goods-stock-rating-on-gamechanger-growth-93CH-4803257 ; 10-K https://www.sec.gov/Archives/edgar/data/1089063/000108906326000016/dks_arx2025.pdf). Price went from ~$60 to ~$100/yr in 2025 (https://www.reddit.com/r/GameChangerApp/comments/1krxs3r/price_nearly_doubling_from_60_to_100year/). X claim of US top-grossing #35 is unverified (https://x.com/consumerxai/status/2105661280552120604).",
    "us_status": "Dominant in US youth baseball/softball; parents and grandparents angry about price hikes and ads for paying users: https://apps.apple.com/us/app/id1308415878#review-14682371674 ; https://www.reddit.com/r/GameChangerApp/comments/1x94fyc/ads/ . GameChanger posted on r/GameChangerApp on ~23 Oct that ads were removed from Premium (still on Free/Plus).",
    "entry_point": "Proof that US parents pay $40–100/yr to follow their own kid. A Berlin solo dev can't take on streaming/scoring network effects; a narrow adjacent tool (lineup/rotation planner for volunteer coaches, RSVP history) sold via Paddle/Polar is the only realistic wedge. Assessment.",
    "why_not_done_yet": "Done; network effect (teams score in GC so families must follow) plus Dick's distribution. Competitor veto for anything head-on. Assessment.",
    "lifecycle_evidence": "Mature/monetising phase: price doubling, ads layered on paid tiers, facility camera deals (QR codes replacing parents' own cameras: https://www.reddit.com/r/GameChangerApp/comments/1xb3b09/mevo_multicam_at_facility_with_gamechanger_qr_code/). Assessment.",
    "stream": "proven-model",
    "market": "US"
   }
  ],
  "distinct_people": 11,
  "distinct_people_note": "Counted from App Store/Play reviewer names, Reddit authors and X handles in the engagement field; no cross-platform dedup (not verified).",
  "weekly_counts": {
   "2026-W39": 1,
   "2026-W40": 2,
   "2026-W41": 2,
   "2026-W42": 5,
   "2026-W43": 1
  },
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 5,
   "last_week_iso": "2026-W41",
   "last_week": 2,
   "partial_week_W43": 1,
   "new_complaints_this_run": 11,
   "note": "US analyst 2026-10-24: counts by post_date over all linked complaints (scout windows 2026-09-22…2026-10-21 and 2026-09-24…2026-10-21); W43 (from Mon 19 Oct) is partial. Growth reflects nights of scouting, not the market."
  },
  "recurring": true,
  "recurring_note": "recurring=true if complaints fall in 3+ consecutive ISO weeks (by post_date). This pain: longest consecutive-week run 5. Scout runs that surfaced it: 2026-10-24.",
  "scores": {
   "frequency": 5,
   "intensity": 4,
   "willingness_to_pay": 3,
   "reachability": 3,
   "buildability": 1,
   "total": 16
  },
  "score_notes": {
   "frequency": "11 complaints; r/GameChangerApp ads thread 38 upvotes / 16 comments (c-047).",
   "intensity": "“Charging $100/yr for Premium Subscription to get your own kid's stats is absurd!” (c-008, https://play.google.com/store/apps/details?id=com.gc.teammanager&reviewId=306ea2ec-1712-4938-9614-3ffd4c3ea9a1); “I pay $99 for this app. I don’t pay to watch your stupid ads.” (c-028, https://apps.apple.com/us/app/id1308415878#review-14682371674)",
   "willingness_to_pay": "Families do pay ($39.99–$99.99/yr per GameChanger FAQ in pm-us-20261024-01) but resent it: “they need to make family free. I don't wanna pay 250$ a season!” (c-009, https://play.google.com/store/apps/details?id=com.gc.teammanager&reviewId=e0d1670e-e3d8-4d43-bbf6-4e5d48e92c96)",
   "reachability": "r/GameChangerApp, r/Baseball parents; seasonal (assessment).",
   "buildability": "Live streaming + team scoring network effect; not a solo 2-week MVP (assessment).",
   "method": "US analyst run 2026-10-24."
  },
  "gates": {
   "consumer_subscription": {
    "result": "pass",
    "text": "pass for the incumbent"
   },
   "simplest_way": {
    "result": "not-assessed",
    "text": "n/a"
   },
   "us_entry": {
    "result": "fail",
    "text": "fail: needs team-level adoption against a DICK'S-owned network"
   }
  },
  "gate_failed": "us_entry/buildability",
  "competitor_veto": true,
  "kill_reason": "Score 16 (near-miss band) but fails the US-entry/buildability gate and would be vetoed anyway: GameChanger (DICK'S, ~10M unique active users per scout links) and Hudl own scoring and streaming; a solo app cannot get teams to switch.",
  "borderline_note": "16/25: strong paying demand and anger, but the job is locked by a DICK'S-owned network; fails US-entry/buildability.",
  "competitors": [],
  "gap": null,
  "plc": {
   "stage": "growth",
   "evidence": [
    "Revenue/growth: GameChanger FY25 revenue close to $150M, ~40% CAGR since 2017 (https://youthsportsbusinessreport.com/dicks-youth-sports-ecosystem-holds-the-line-as-foot-locker-losses-force-a-guidance-cut/ , scout link).",
    "Price trend: ~$60→~$100/yr in 2025 (https://www.reddit.com/r/GameChangerApp/comments/1krxs3r/price_nearly_doubling_from_60_to_100year/); ads layered on paid tiers (c-026, c-028, c-047).",
    "Competitor trend: facility camera deals with GameChanger QR codes (c-049); Hudl in school sports (c-011).",
    "Search trend not checked (no Google Trends access)."
   ],
   "verdict": "no",
   "verdictText": "no for a solo entrant (assessment): the stage clearly supports paid subscriptions — for the network owner, not a newcomer.",
   "assessment": true,
   "stageText": "growth (incumbent monetising)"
  },
  "verdict": "near-miss"
 },
 {
  "painId": "p-089",
  "night": "2026-10-24",
  "analyst_run": "2026-10-24-us",
  "market": "US",
  "niche": "kids' activities & school logistics",
  "name": null,
  "label": "Team-app ads, RSVP & fees",
  "pitch": null,
  "price": null,
  "mvp": null,
  "killQuestion": null,
  "description": "US parents and volunteer coaches hate ad-heavy, clunky team and activity apps (TeamSnap, SportsEngine, SignUpGenius, Spond, Playground): full-screen video ads even for paying teams, lost threads, no RSVP change history, duplicate-email limits for siblings, and 3.25% fees to pay tuition.",
  "who": "US youth-sports parents, team managers and volunteer coaches (US Play/App Store reviewers of TeamSnap, SportsEngine, SignUpGenius, Spond, Playground; r/GameChangerApp)",
  "source": "complaints+proven-model",
  "evidenceSummary": "10 complaints from 10 people (Google Play 5, App Store 4, Reddit 1); proven model Spond.",
  "complaint_ids": [
   "c-us-20261024-016",
   "c-us-20261024-017",
   "c-us-20261024-018",
   "c-us-20261024-019",
   "c-us-20261024-020",
   "c-us-20261024-037",
   "c-us-20261024-038",
   "c-us-20261024-039",
   "c-us-20261024-040",
   "c-us-20261024-048"
  ],
  "quotes": [
   {
    "id": "c-us-20261024-040",
    "found_date": "2026-10-24",
    "post_date": "2026-10-21",
    "source": "app_store TeamSnap (US storefront)",
    "link": "https://apps.apple.com/us/app/id393048976#review-14694996060",
    "quote": "Teams already pay to use this, it is ridiculous to have these ads.",
    "engagement": "1★ review by 'Brosef4891', title: 'Ads are unbearable and dangerous'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-019",
    "found_date": "2026-10-24",
    "post_date": "2026-10-18",
    "source": "google_play Spond (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.spond.spond&reviewId=f97dcc85-b541-41e7-b709-6898882d489b",
    "quote": "there can't be any duplicate emails (silly for parents with multiple children on a team).",
    "engagement": "1★ review by 'Shawn Richarz', 0 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-018",
    "found_date": "2026-10-24",
    "post_date": "2026-10-16",
    "source": "google_play TeamSnap (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.teamsnap.teamsnap&reviewId=5bc35446-1923-4449-a03e-5138cc1d0c60",
    "quote": "they expect every single member of your club to get a paid subscription to avoid their extreme quantity of ads.",
    "engagement": "2★ review by 'TRr4M', 0 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-037",
    "found_date": "2026-10-24",
    "post_date": "2026-10-16",
    "source": "app_store SignUpGenius (US storefront)",
    "link": "https://apps.apple.com/us/app/id1314654833#review-14674050073",
    "quote": "Video ads hijack the screen between most actions.",
    "engagement": "1★ review by 'Joooooooshua', title: 'Not an App, just an Ad farm'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-017",
    "found_date": "2026-10-24",
    "post_date": "2026-10-14",
    "source": "google_play TeamSnap (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.teamsnap.teamsnap&reviewId=8b98d694-bd4a-4ea4-b6fe-66b338c1d2ef",
    "quote": "The full-screen ads with sound are HORRIBLE!",
    "engagement": "1★ review by 'Chris Highet', 5 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-016",
    "found_date": "2026-10-24",
    "post_date": "2026-10-13",
    "source": "google_play TeamSnap (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.teamsnap.teamsnap&reviewId=41ae22b9-a2f9-40e2-a94c-bf30e3103042",
    "quote": "It loses message threads, can't integrate web/app, has no billing functionality in the app, doesn't push RSVP updates",
    "engagement": "1★ review by 'Raf Bini', 38 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-038",
    "found_date": "2026-10-24",
    "post_date": "2026-10-04",
    "source": "app_store SportsEngine (US storefront)",
    "link": "https://apps.apple.com/us/app/id499597400#review-14628505780",
    "quote": "I don’t like having to sit through ads to view a schedule.",
    "engagement": "1★ review by 'Ryan0067', title: 'As a coach and a parent, I hate this.'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-048",
    "found_date": "2026-10-24",
    "post_date": "2026-10-04",
    "source": "reddit r/GameChangerApp",
    "link": "https://www.reddit.com/r/GameChangerApp/comments/1wxocan/feature_request_rsvp_change_history/",
    "quote": "I’m so tired of thinking we have enough or don’t have enough and then people change their status and then ensuing questions.",
    "engagement": "20 upvotes, 7 comments (archive snapshot), u/papacarm",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-020",
    "found_date": "2026-10-24",
    "post_date": "2026-09-29",
    "source": "google_play Playground (US storefront)",
    "link": "https://play.google.com/store/apps/details?id=com.afterschooldevelopment.carline&reviewId=162b579d-7b86-43f1-9db0-4431cf5ca1db",
    "quote": "I really don't like having to pay extra just to pay my kids tuition! 3.25% is crazy!",
    "engagement": "2★ review by 'Shelley Martin', 0 thumbs up",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-039",
    "found_date": "2026-10-24",
    "post_date": "2026-09-27",
    "source": "app_store TeamSnap (US storefront)",
    "link": "https://apps.apple.com/us/app/id393048976#review-14599685016",
    "quote": "important details get buried in lengthy team chats that parents don’t have time to scroll through",
    "engagement": "3★ review by 'SMONT123456789', title: 'Missing Essential Game-Day Features'",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   }
  ],
  "proven_models": [
   {
    "id": "pm-us-20261024-04",
    "found_date": "2026-10-24",
    "app": "Spond (free team/club app, monetised via payments)",
    "country": "Norway",
    "model_and_price": "Free for teams and parents, no ads; revenue from payment processing fees on dues/fees collected in the app and club add-ons (https://stripe.com/customers/spond).",
    "traction_evidence": "4M+ monthly active users; 1.5M UK users (https://stripe.com/customers/spond). FY25 revenue NOK 137.6M, loss NOK 35M; raised NOK 42.5M in July 2026 (https://www.mainsights.io/ma-news/verdane-backed-sportstech-spond-raises-new-capital-from-existing-investors-to-fund-further-growth-investments). US site live (https://www.spond.com/en-us/our-mission/).",
    "us_status": "Present but small in the US (estimate); the US incumbent TeamSnap is hated for ads and missing in-app billing: https://play.google.com/store/apps/details?id=com.teamsnap.teamsnap&reviewId=41ae22b9-a2f9-40e2-a94c-bf30e3103042 ; https://apps.apple.com/us/app/id393048976#review-14694996060 . RSVP-history pain also in GameChanger: https://www.reddit.com/r/GameChangerApp/comments/1wxocan/feature_request_rsvp_change_history/",
    "entry_point": "Shows an ad-free free-first model can beat ad-heavy incumbents. But it is a payments/marketplace model, not a consumer subscription, and needs payment licensing/Stripe Connect-style rails; poor fit for a Berlin solo dev selling via Paddle/Polar/Lemon Squeezy. Assessment.",
    "why_not_done_yet": "Spond itself plus TeamSnap, SportsEngine, GameChanger, Heja, BAND cover it; two-sided team adoption is slow. Competitor veto. Assessment.",
    "lifecycle_evidence": "Scaling, still loss-making (FY25 loss NOK 35M). Fact per mainsights link; stage label is an assessment.",
    "stream": "proven-model",
    "market": "US"
   }
  ],
  "distinct_people": 10,
  "distinct_people_note": "Counted from App Store/Play reviewer names, Reddit authors and X handles in the engagement field; no cross-platform dedup (not verified).",
  "weekly_counts": {
   "2026-W39": 1,
   "2026-W40": 3,
   "2026-W42": 5,
   "2026-W43": 1
  },
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 5,
   "last_week_iso": "2026-W41",
   "last_week": 0,
   "partial_week_W43": 1,
   "new_complaints_this_run": 10,
   "note": "US analyst 2026-10-24: counts by post_date over all linked complaints (scout windows 2026-09-22…2026-10-21 and 2026-09-24…2026-10-21); W43 (from Mon 19 Oct) is partial. Growth reflects nights of scouting, not the market."
  },
  "recurring": false,
  "recurring_note": "recurring=true if complaints fall in 3+ consecutive ISO weeks (by post_date). This pain: longest consecutive-week run 2. Scout runs that surfaced it: 2026-10-24.",
  "scores": {
   "frequency": 4,
   "intensity": 3,
   "willingness_to_pay": 2,
   "reachability": 3,
   "buildability": 2,
   "total": 14
  },
  "score_notes": {
   "frequency": "10 complaints; top TeamSnap review has 38 thumbs up (c-016).",
   "intensity": "“The full-screen ads with sound are HORRIBLE!” (c-017, https://play.google.com/store/apps/details?id=com.teamsnap.teamsnap&reviewId=8b98d694-bd4a-4ea4-b6fe-66b338c1d2ef); “I’m so tired of thinking we have enough or don’t have enough and then people change their status and then ensuing questions.” (c-048, https://www.reddit.com/r/GameChangerApp/comments/1wxocan/feature_request_rsvp_change_history/)",
   "willingness_to_pay": "They already pay and object to more: “Teams already pay to use this, it is ridiculous to have these ads.” (c-040, https://apps.apple.com/us/app/id393048976#review-14694996060); Spond shows the winning model is free (pm-us-20261024-04).",
   "reachability": "Team managers, not parents, choose the app (assessment).",
   "buildability": "Two-sided team adoption plus payments (assessment).",
   "method": "US analyst run 2026-10-24."
  },
  "gates": {
   "consumer_subscription": {
    "result": "fail",
    "text": "fail: team tool chosen by managers, free leader (Spond), payments model"
   },
   "simplest_way": {
    "result": "not-assessed",
    "text": "n/a"
   },
   "us_entry": {
    "result": "fail",
    "text": "fail: team adoption"
   }
  },
  "gate_failed": "consumer_subscription",
  "competitor_veto": false,
  "kill_reason": "Below bar (14) and fails the consumer-subscription gate; Spond (free, ad-free) and TeamSnap/SportsEngine/BAND cover it.",
  "borderline_note": null,
  "competitors": [],
  "gap": null,
  "plc": null,
  "verdict": "below-bar"
 },
 {
  "painId": "p-090",
  "night": "2026-10-24",
  "analyst_run": "2026-10-24-us",
  "market": "US",
  "niche": "kids' activities & school logistics",
  "name": null,
  "label": "Family calendar with work-calendar sync",
  "pitch": null,
  "price": null,
  "mvp": null,
  "killQuestion": null,
  "description": "US parents want one family calendar that two-way syncs with work Google/Outlook calendars and includes chores, without paying for business tiers or hardware add-ons.",
  "who": "US dads and moms coordinating a household calendar (r/daddit, r/Parenting Skylight thread)",
  "source": "complaints+proven-model",
  "evidenceSummary": "3 complaints from 3 people (Reddit 3); proven model Skylight.",
  "complaint_ids": [
   "c-us-20261024-042",
   "c-us-20261024-043",
   "c-us-20261024-046"
  ],
  "quotes": [
   {
    "id": "c-us-20261024-042",
    "found_date": "2026-10-24",
    "post_date": "2026-10-18",
    "source": "reddit r/daddit",
    "link": "https://www.reddit.com/r/daddit/comments/1x8re8x/project_2_the_great_calendar_task_sync/",
    "quote": "I need something more robust with family and calendar syncing capacity.",
    "engagement": "1 upvotes, 12 comments (archive snapshot), u/MllM88",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-043",
    "found_date": "2026-10-24",
    "post_date": "2026-10-18",
    "source": "reddit r/daddit (comment)",
    "link": "https://www.reddit.com/r/daddit/comments/1x8re8x/project_2_the_great_calendar_task_sync/phf5f2s/",
    "quote": "the 2 way sync between google and a personal calendar is the real pain point. i've never found anything that handles that cleanly without paying for some business tier plan.",
    "engagement": "1 upvotes (archive snapshot), u/Positive-Demand-5583",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   },
   {
    "id": "c-us-20261024-046",
    "found_date": "2026-10-24",
    "post_date": "2026-10-16",
    "source": "reddit r/Parenting (comment)",
    "link": "https://www.reddit.com/r/Parenting/comments/1x73vxo/skylight_calendar/ph15bj2/",
    "quote": "You do need a subscription for the chores part of the calendar which is annoying",
    "engagement": "1 upvotes (archive snapshot), u/coheed9867",
    "niche": "kids' activities & school logistics",
    "stream": "problem",
    "market": "US"
   }
  ],
  "proven_models": [
   {
    "id": "pm-us-20261024-03",
    "found_date": "2026-10-24",
    "app": "Skylight (family calendar hardware + Plus subscription)",
    "country": "US",
    "model_and_price": "Hardware calendar/frame plus Skylight Plus subscription; Plus raised from $39 to $79/yr, and more than 50% of Calendar buyers subscribe (https://gtmsauce.com/tactics/skylight-raise-the-yearly-plan-from-39-to-79-not-the-99-tests-favored).",
    "traction_evidence": "Bootstrapped; 12M customers and 1.7M Calendar households as of 30 Sep 2026; credit facility expanded to $75M (https://www.prnewswire.com/news-releases/skylight-expands-credit-facility-to-75-million-to-help-families-share-the-load-through-every-stage-of-life-302893571.html).",
    "us_status": "Big in the US; parents note the subscription for chores and that the school-email import (Sidekick) is clunky: https://www.reddit.com/r/Parenting/comments/1x73vxo/skylight_calendar/ph15bj2/ ; two-way calendar sync remains a pain: https://www.reddit.com/r/daddit/comments/1x8re8x/project_2_the_great_calendar_task_sync/phf5f2s/",
    "entry_point": "Proof that US families pay ~$79/yr for a shared family calendar layer. Software-only (no hardware) is the only solo-dev route; Paddle/Polar subscription. Assessment.",
    "why_not_done_yet": "Crowded: Cozi, FamilyWall, Hearth, Skylight app, plus AI assistants; family organizers already heavily covered in pains.json. Likely competitor veto. Assessment.",
    "lifecycle_evidence": "Growth with pricing power (price doubled while attach rate stayed >50%). Assessment.",
    "stream": "proven-model",
    "market": "US"
   }
  ],
  "distinct_people": 3,
  "distinct_people_note": "Counted from App Store/Play reviewer names, Reddit authors and X handles in the engagement field; no cross-platform dedup (not verified).",
  "weekly_counts": {
   "2026-W42": 3
  },
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 3,
   "last_week_iso": "2026-W41",
   "last_week": 0,
   "partial_week_W43": 0,
   "new_complaints_this_run": 3,
   "note": "US analyst 2026-10-24: counts by post_date over all linked complaints (scout windows 2026-09-22…2026-10-21 and 2026-09-24…2026-10-21); W43 (from Mon 19 Oct) is partial. Growth reflects nights of scouting, not the market."
  },
  "recurring": false,
  "recurring_note": "recurring=true if complaints fall in 3+ consecutive ISO weeks (by post_date). This pain: longest consecutive-week run 1. Scout runs that surfaced it: 2026-10-24.",
  "scores": {
   "frequency": 4,
   "intensity": 3,
   "willingness_to_pay": 4,
   "reachability": 3,
   "buildability": 3,
   "total": 17
  },
  "score_notes": {
   "frequency": "Only 3 complaints tonight, but proven demand is large: Skylight 1.7M Calendar households and >50% Plus attach (pm-us-20261024-03, scout links); Cozi 399,369 US ratings (third-party, sources.md).",
   "intensity": "“the 2 way sync between google and a personal calendar is the real pain point. i've never found anything that handles that cleanly without paying for some business tier plan.” (c-043, https://www.reddit.com/r/daddit/comments/1x8re8x/project_2_the_great_calendar_task_sync/phf5f2s/)",
   "willingness_to_pay": "Skylight Plus $79/yr, Cozi Gold $39/yr, FamilyWall $44.99/yr (sources.md); but “You do need a subscription for the chores part of the calendar which is annoying” (c-046, https://www.reddit.com/r/Parenting/comments/1x73vxo/skylight_calendar/ph15bj2/)",
   "reachability": "r/daddit, r/Parenting, r/Mommit (assessment).",
   "buildability": "Two-way Google/Outlook sync is fiddly but possible in 2 weeks for one provider (assessment).",
   "method": "US analyst run 2026-10-24."
  },
  "gates": {
   "consumer_subscription": {
    "result": "pass",
    "text": "pass"
   },
   "simplest_way": {
    "result": "pass",
    "text": "pass (open app, today's family agenda)"
   },
   "us_entry": {
    "result": "pass",
    "text": "pass on mechanics"
   }
  },
  "gate_failed": null,
  "competitor_veto": true,
  "kill_reason": "Near-miss at 17 and would also face a competitor veto: Cozi (free / Gold $39 / Max $79), Skylight app (Calendar Plus $79), FamilyWall ($44.99), TimeTree ($44.99), Fami, plus Google Calendar free.",
  "borderline_note": "17/25: proven paying demand (Skylight) but only 3 complaints and a crowded field.",
  "competitors": [
   {
    "name": "Cozi",
    "url": "https://www.cozi.com/compare-plans/",
    "price": "Free; Gold $39/yr; Max $79/yr",
    "price_source": "https://www.cozi.com/compare-plans/",
    "loves": [],
    "hates": [],
    "funding": "not checked"
   },
   {
    "name": "Skylight app (Calendar Plus)",
    "url": "https://myskylight.com/products/calendar-skylight-plus",
    "price": "$79/yr",
    "price_source": "https://skylight.zendesk.com/hc/en-us/articles/51833126965019-Subscription",
    "loves": [],
    "hates": [
     {
      "quote": "You do need a subscription for the chores part of the calendar which is annoying",
      "who": "u/coheed9867, r/Parenting (c-046)",
      "link": "https://www.reddit.com/r/Parenting/comments/1x73vxo/skylight_calendar/ph15bj2/"
     }
    ],
    "funding": "Bootstrapped + $75M credit facility (pm-us-20261024-03)"
   },
   {
    "name": "FamilyWall / TimeTree",
    "url": "https://gethomsy.com/blog/comparisons/best-family-organizer-apps-2026",
    "price": "$44.99/yr each (third-party comparison)",
    "price_source": "https://gethomsy.com/blog/comparisons/best-family-organizer-apps-2026",
    "loves": [],
    "hates": [],
    "funding": "not checked"
   }
  ],
  "gap": "Cheap reliable two-way sync with work calendars; Cozi's Google sync is still read-only per a third-party review (https://www.usecalendara.com/blog/cozi-pricing-2026). Narrow, and Skylight/Fambot already sync.",
  "plc": {
   "stage": "growth",
   "evidence": [
    "Category age: Cozi is long-established (399,369 US ratings, third-party); Skylight 12M customers (pm-us-20261024-03).",
    "Price trend: up — Skylight Plus $39→$79 with >50% attach; Cozi added Max $79 (sources.md).",
    "Competitor count: 8+ paid family organizers priced $9.99–$79/yr (gethomsy.com comparison).",
    "Search trend not checked."
   ],
   "verdict": "maybe",
   "verdictText": "maybe (assessment): paid subscriptions clearly work, but the market is crowded and needs a sharp wedge.",
   "assessment": true,
   "stageText": "growth→maturity"
  },
  "verdict": "near-miss"
 },
 {
  "painId": "p-091",
  "night": "2026-10-24",
  "analyst_run": "2026-10-24-us",
  "market": "US",
  "niche": "kids' activities & school logistics",
  "name": null,
  "label": "Lineup tool for volunteer coaches",
  "pitch": null,
  "price": null,
  "mvp": null,
  "killQuestion": null,
  "description": "US volunteer youth baseball/softball coaches need fair-play position rotations and lineup cards each game and still build them in Google Sheets; paid lineup apps exist (Dugout Edge).",
  "who": "US Little League and rec-league volunteer coaches (r/LittleLeague)",
  "source": "proven-model",
  "evidenceSummary": "0 complaints from 0 people (); proven model Dugout Edge.",
  "complaint_ids": [],
  "quotes": [],
  "proven_models": [
   {
    "id": "pm-us-20261024-06",
    "found_date": "2026-10-24",
    "app": "Dugout Edge (youth baseball/softball coach lineup tool)",
    "country": "US",
    "model_and_price": "Free tier; Premium $10/mo or $60/yr (https://www.dugoutedge.com/brand-facts).",
    "traction_evidence": "Company claims 10,000+ coaches and launched live scoring in Aug 2026 (https://www.dugoutedge.com/brand-facts); paying-user count unknown. A Little League coach says they signed up monthly: https://www.reddit.com/r/LittleLeague/comments/1wsw4un/position_rotation_for_minors_divisions/ (thread). Weak paid-traction evidence.",
    "us_status": "US volunteer coaches still build lineups in Google Sheets and dislike existing apps (same r/LittleLeague thread above); GameChanger is adding lineup features.",
    "entry_point": "Small, buildable coach tool (fair-play rotations, lineup cards) with Paddle/Polar subscription; seasonal demand. Assessment.",
    "why_not_done_yet": "Already done by Dugout Edge, GameChanger lineups, and others; seasonal churn and US-only sport. Assessment.",
    "lifecycle_evidence": "Early: a small paid niche tool expanding into scoring. Assessment.",
    "stream": "proven-model",
    "market": "US"
   }
  ],
  "distinct_people": 0,
  "distinct_people_note": "",
  "weekly_counts": {},
  "week_over_week": {
   "this_week_iso": "2026-W42",
   "this_week": 0,
   "last_week_iso": "2026-W41",
   "last_week": 0,
   "note": "Proven-model-only entry; no linked complaints in us/complaints.jsonl (the r/LittleLeague thread is cited by the scout but was not logged as a complaint)."
  },
  "recurring": false,
  "recurring_note": "No linked complaints.",
  "scores": {
   "frequency": 2,
   "intensity": 2,
   "willingness_to_pay": 2,
   "reachability": 4,
   "buildability": 5,
   "total": 15
  },
  "score_notes": {
   "frequency": "No complaint ids; Dugout Edge claims 10,000+ coaches (company claim, https://www.dugoutedge.com/brand-facts); paying count unknown.",
   "intensity": "Weekly chore during season, low emotional pain (assessment).",
   "willingness_to_pay": "One coach on r/LittleLeague said they signed up monthly (scout link https://www.reddit.com/r/LittleLeague/comments/1wsw4un/position_rotation_for_minors_divisions/); weak evidence.",
   "reachability": "r/LittleLeague, coach Facebook groups, App Store 'lineup' keyword (assessment).",
   "buildability": "Rotation rules + printable card is a 1–2 week build (assessment).",
   "method": "US analyst run 2026-10-24; proven-model stream."
  },
  "gates": {
   "consumer_subscription": {
    "result": "borderline",
    "text": "borderline: seasonal (spring), churn after season (assessment)"
   },
   "simplest_way": {
    "result": "pass",
    "text": "pass (pick who's here, rotation generated)"
   },
   "us_entry": {
    "result": "pass",
    "text": "pass on mechanics"
   }
  },
  "gate_failed": null,
  "competitor_veto": true,
  "kill_reason": "15/25 near-miss; Dugout Edge and GameChanger lineups already cover it and demand is seasonal with weak paid-traction evidence.",
  "borderline_note": "15/25: very buildable but tiny, seasonal and already served.",
  "competitors": [],
  "gap": null,
  "plc": {
   "stage": "introduction",
   "evidence": [
    "Dugout Edge: free tier + $60/yr Premium, 10,000+ coaches claimed, added live scoring Aug 2026 (https://www.dugoutedge.com/brand-facts, scout link).",
    "Incumbent moving in: GameChanger adding lineup features (pm-us-20261024-06).",
    "Coaches still use Google Sheets (r/LittleLeague thread, scout link). Search trend not checked."
   ],
   "verdict": "maybe",
   "verdictText": "maybe→no (assessment): early niche, seasonal, the market must be educated and GameChanger is closing the gap.",
   "assessment": true,
   "trendTo": "no"
  },
  "verdict": "near-miss"
 }
];
