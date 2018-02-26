# Aas-WomenHack

Aas is live at : https://vast-woodland-33701.herokuapp.com/ 

This Project was made collectively by
[Rahmeen Habib](https://www.github.com/rahmeen14) and [Akshita Aggarwal](https://www.github.com/akshitaag).
## SITUATION:
Crimes against women are consistently escalating to reach the alarming rates of 39 every hour in our country, India. “Cruelty by husband or his relatives” was the most reported crime against women, accounting for 33% of all crimes in 2016. Of 39,068 rape victims in 2016, 43% were girls below 18 years. Offenders were known to the victim in 95% reported cases. Of these, 29% were “neighbours”, “known persons on promise to marry the victim” (27%) and “other known persons”(30%).

The above stats clearly highlight the fact that most crimes against women are committed by people they’re closely surrounded with.

And these are the ones that were reported. It’s estimated that at least twice as many go unreported, undiscussed and unstated.

## ISSUE:

A large section of the Indian female population has been a victim of molestation in some form or the other , but still they find it difficult to come forward and raise their voices against it. To highlight the problem , let's take an example: A woman suffers domestic violence where she is mistreated (even beaten up and sexually assaulted) by her husband and in-laws every other day. Being from an orthodox Indian family, she cannot go ahead and file a complaint against him out of the fear of loss of reputation of herself and her family in the society. She suffers from the pain each day and cannot voice any of it. This is infact a common situation in a country like India , where societal pressure prevents a woman from raising her voice against her molesters. Not only that, the situation is such that women in our country fear travelling alone for the fear of being molested, attacked, assaulted and even raped, especially in a city like Delhi which is notorious for being the rape capital of the country.

## HOW WE THINK WE CAN HELP ?
The problem is that since many women do not wish to report the crimes against them , they live their lives with a sense of threat and fear. One thing we realized is that reporting to the police is not always something such suppressed women can garner courage to do. And even if they do, they rarely have proper backing. Let’s continue the above example for the solution we offer: Imagine that if the woman in the above case could discuss her problem to someone who could offer her expert advices specific to her situation. If there could be someone with whom she can share her problems without any fear of loss of family reputation and also with the assurance of definitely finding a solution. This is what we wish to offer.

We plan to design a web portal where women will be provided a 1 to 1 advisorship by experts and NGOs. *How it works ? *Whenever a woman who wishes to seek help, she registers on our platform. Then she’ll be provided with the options of connecting with either an NGO or an advisor. These advisors can be female social workers, lawyers, gynecologists, psychiatrists, professional counselors or survivors who can relate best with them. Accordingly, she will be connected to the most suitable advisor or ngo according to her location and her problem. For smooth connection, we have integrated a chat-channel in our platform. Help seekers and advisors/NGOs can initiate conversations on the chat-channel itself.Besides that both of them will be provided each others’ contact details so that they can meet in-person or call , whatever be necessary.

## Features: 
* One to one advisorship platform 
* Separate profiles for every registered person - be it seeker or advisor
* Chat-channel (implemented from scratch) to discuss all the issues 
* Blog to write about your experiences/survivor stories and also to get inspired by others. Even advisors can publish their own blogs 
* Awareness tab that tells about latest safety gadgets/measures to keep women updated on safety issues.
* Contribute tab to accept donations from philanthropists and feminists that care for our cause
* The star feature of our project is Etihaad. Google map tries to find the fastest route between two places even if it may mean compromising on safety and security. Etihaad aims at detecting the safest route by finding danger index of all possible paths between two places which is a weighted sum of numeric values our unsupervised machine learning algorithm devised and assigned to 166 places in Delhi . We hope to extend that by including more detailed and transparent data which is not currently available.

## Tech Stack: 
We plan to use Node.js on the server side, Mongo DB(for data persistence), Socket.IO (for communication channel) and Python(for Machine Learning). Frontend : HTML ,CSS , Javascript.

## Technical Complexity: 
1. We plan on using JS both on server side (by our asynchronous node framework) as well as client side. 
2. We will be implemeting a Chat-App from scratch using Socket.io 
3. We shall also be integrating a full-fledged Blog App within our site 
4. We’ll also apply unsupervised k-means clustering algorithm to train our Machine Learning Model on Crime Data of Delhi. This information will then be used to mark danger indices of paths between any two places on a Google Maps API 
5. We shall also be scraping the net to find new technological advancements in women safety that’ll be displayed under the awareness tab of our portal

```
clone this repo
cd into it
npm install
node server/server.js
```
Browse to ```localhost:3000``` and visit Aas-Never lose hope!
