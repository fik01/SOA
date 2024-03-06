INSERT INTO stakeholders."Users"(
	"Id", "Username", "Password", "Role", "IsActive", "ResetPasswordToken", "EmailVerificationToken")
	VALUES 
    (-5, 'stefanstojanovic', 'dvX14dynIiSenCwcPYbHo4mEdZGxE+00q0nLvW9hho2fDKKh7lFQum0PyFraSBSDQtDFXn6GTxM7NjeQ3iz+/ppY6oC9qbkr1XgLEMSGWhc=', 1, true, NULL, NULL),
    (-4, 'ivanapopovic', 'dvX14dynIiSenCwcPYbHo4mEdZGxE+00q0nLvW9hho2fDKKh7lFQum0PyFraSBSDQtDFXn6GTxM7NjeQ3iz+/ppY6oC9qbkr1XgLEMSGWhc=', 1, true, NULL, NULL),
    (-3, 'nikoladjordjevic', 'dvX14dynIiSenCwcPYbHo4mEdZGxE+00q0nLvW9hho2fDKKh7lFQum0PyFraSBSDQtDFXn6GTxM7NjeQ3iz+/ppY6oC9qbkr1XgLEMSGWhc=', 1, true, NULL, NULL),
    (-2, 'jovananikolic', '8QpgZuFOHE/OKm20yXXM9vkUimZBoJgl7wjfetZxom1u2+xvFsLhQft2lPXSd/A9FvqheUXTFvGYaO3dfBQ8o4D8juFAyXnUb75VpUBHN4U=', 0, true, NULL, NULL),
    (-1, 'markopetrovic', '8QpgZuFOHE/OKm20yXXM9vkUimZBoJgl7wjfetZxom1u2+xvFsLhQft2lPXSd/A9FvqheUXTFvGYaO3dfBQ8o4D8juFAyXnUb75VpUBHN4U=', 0, true, NULL, NULL),
    (-6, 'anaivanovic', 'dvhRNsTWf+OgU/Kbdt/MRvVWBZ+s/BNqsmSH9AurBMTj9m4cml9kG/2XGCMrP4UarMOtmecjiF+q7fDjvitcOs0sBUt4oPSwLUQTZBkV3x8=', 2, true, NULL, NULL),
    (-7, 'lukastankovic', 'MvhubNOwmmqs4dE1e9VAR64KAUk2To3031RLyWwWNmvW6lnPOt36AlIIXw0qpqJlVLNdf0WU0dDY5LWunMK27UM08/Q7XGJbbY18ql8PQHk=', 2, true, NULL, NULL),
    (-8, 'katarinastojkovic', '7IOHpM31bKnANVn4rRWAwcUK1Mx0+6h6RsZBgTrbWkwyLUAu2h+K5XcvWNAmpBQlJyaHF3ujEXeYFD/at62aPvuD/DY4ahTeXkRc6/JUrRo=', 2, true, NULL, NULL),
    (-9, 'stefanstevanovic', 'YxjTD1azpTiMHdDSz0BmOQgGq24nB6hga25xl+7ry/zhc7PwQMJmyuP/jnbmv4tfMoiHu6AvtAguyyLu+KDV10cmls0817zlw9Z7itaZXec=', 2, true, NULL, NULL),
    (-10, 'momcilojovanovic', 'kehmRK2p6VOc6R1VfPEZQv5nYGbvsEiojFniQvtWyV+eqO/i9cQX/B8AP4m5/qE2Yvfa9nUGWpCmblvPCU1pS7z8XeK8yumoAAflxpEcp6g=', 2, true, NULL, NULL);

INSERT INTO stakeholders."People"(
	"Id", "UserId", "Name", "Surname", "Email", "ProfilePic", "Biography", "Motto", "Latitude", "Longitude")
	VALUES 
    (-5, -5, 'Stefan', 'Stojanovic', 'daniel.taylor@example.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRwFPvxRehntR5397hV7BnIqzYiRwXuS-dEA&usqp=CAU', 'I, Stefan Stojanović, navigate the complexities of life with a harmonious blend of analytical acumen and a creative spirit. My insatiable curiosity drives me to unravel the intricacies of the world, crafting a narrative that seamlessly intertwines logic and imaginative expression.', 'Be yourself', NULL, NULL),
    (-4, -4, 'Ivana', 'Popovic', 'olivia.wilson@example.com', 'https://i.pinimg.com/736x/6c/74/0a/6c740ab80717f5d41deab06d8040b1f0.jpg', 'I explore the world through the lens of art and science, seamlessly weaving imaginative concepts with profound analytical thinking. My passionately dedicated pursuit of storytelling and unraveling the essence of reality defines me as a true explorer fearlessly venturing into new horizons, harmonizing rationality and creativity.', 'Spread love', NULL, NULL),
    (-3, -3, 'Nikola', 'Djordjevic', 'author@example.com', 'https://images.unsplash.com/photo-1628563694622-5a76957fd09c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D', 'I am a visionary mind, seamlessly blending analytical prowess with artistic expression. My unique ability to weave complex ideas into compelling narratives transforms the mundane into the extraordinary, defining me as a trailblazer at the intersection of logic and creativity.', 'Stay positive', NULL, NULL),
    (-2, -2, 'Jovana', 'Nikolic', 'jane.smith@example.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4DQ-tp12zlDGEUfulC2NNYwJ7vvskGXip6w&usqp=CAU', 'Jovana Nikolic is an enigmatic individual, known for her unparalleled creativity in merging art and technology. With a keen intellect and a passion for innovation, she navigates a surreal world of imagination, leaving a trail of wonder and inspiration in her wake.', 'Live in the moment', NULL, NULL),
    (-1, -1, 'Marko', 'Petrovic', 'john.doe@example.com', 'https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Carpe Diem', NULL, NULL),
    (-6, -6, 'ana', 'ivanovic', 'ivanovicana628@gmail.com', 'https://i.pinimg.com/550x/1f/83/c5/1f83c5ce9090c12d1969ad7a3745cc82.jpg', 'I, Ana Ivanović, traverse lifes path with a graceful harmony of strategic insight and artistic finesse. Fueled by an unwavering curiosity, I unravel the intricacies of the world, crafting a narrative that seamlessly intertwines logic with the elegance of imaginative expression.', 'Believe in yourself', NULL, NULL),
    (-7, -7, 'Luka', 'Stankovic', 'leopoldinapraksa@gmail.com', 'https://e0.pxfuel.com/wallpapers/932/376/desktop-wallpaper-stylish-boys-cool-d-profile-pics-for-facebook-whatsapp-pretty-boys.jpg', 'I, Luka Stanković, embark on the journey of life with a unique fusion of analytical insight and artistic flair. My ceaseless curiosity propels me to decipher the nuances of the world, constructing a narrative that seamlessly intertwines logic with creative expression.', 'Chase your dreams', NULL, NULL),
    (-8, -8, 'Katarina', 'Stojkovic', 'leopoldinica123@gmail.com', 'https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8', 'I, Katarina Stojković, navigate lifes tapestry with a captivating blend of analytical precision and a creative heartbeat. Fueled by an insatiable curiosity, I unravel the threads of the world, crafting a narrative that seamlessly intertwines logic with the poetry of imagination.', 'Embrace the journey', NULL, NULL),
    (-9, -9, 'Stefan', 'Stevanovic', 'leopoldina.djanic01@gmail.com', 'https://media.vanityfair.com/photos/63068cbbbfb0c00da24590fe/master/pass/Luke-MacFarlane-Profile-Story-Image.jpg', 'I, Stefan Stevanović, embark on lifes odyssey with a unique fusion of analytical prowess and a creative spirit. Driven by an unyielding curiosity, I unravel the intricacies of the world, crafting a narrative that seamlessly intertwines logic with imaginative expression.', 'Explore the unknown', NULL, NULL),
    (-10, -10, 'Momcilo', 'Jovanovic', 'momciloj110@gmail.com', 'https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg', 'I, Momčilo Jovanović, navigate the realms of existence with a distinctive blend of analyticalinsight and a creative heartbeat. Fueled by an unquenchable curiosity, I unravel the complexities of the world, weaving a narrative that seamlessly merges logic with the artistry of imagination.', 'Create your own destiny', NULL, NULL);

INSERT INTO stakeholders."UserNews"(
	"Id", "TouristId", "LastSendMs", "SendingPeriod")
	VALUES 
    (-3, -6, 0, 0),
    (-4, -7, 0, 0),
    (-5, -8, 0, 0),
    (-6, -9, 0, 0),
    (-7, -10, 0, 0);

INSERT INTO payments."Wallet"(
	"Id", "UserId", "Balance")
	VALUES 
    (-3, -6, 2000),
    (-4, -7, 2000),
    (-5, -8, 2000),
    (-6, -9, 2000),
    (-7, -10, 2000);

INSERT INTO encounters."UserExperience"(
	"Id", "UserId", "XP", "Level")
	VALUES 
    (-3, -6, 0, 1),
    (-4, -7, 0, 1),
    (-5, -8, 0, 1),
    (-6, -9, 0, 1),
    (-7, -10, 0, 1);

INSERT INTO stakeholders."Followers"(
	"Id", "FollowerId", "FollowedId", "Notification")
	VALUES 
    (-1, -3, -4, '{"Read": false, "Content": "Nikola Djordjevic has started following you", "TimeOfArrival": "2024-01-15T13:46:19.305Z"}'),
    (-3, -7, -5, '{"Read": false, "Content": "Luka Stankovic has started following you", "TimeOfArrival": "2024-01-15T13:48:57.663Z"}'),
    (-4, -8, -5, '{"Read": false, "Content": "Katarina Stojkovic has started following you", "TimeOfArrival": "2024-01-15T13:50:24.789Z"}'),
    (-5, -9, -4, '{"Read": false, "Content": "Stefan Stevanovic has started following you", "TimeOfArrival": "2024-01-15T13:51:52.818Z"}'),
    (-6, -6, -4, '{"Read": false, "Content": "ana ivanovic has started following you", "TimeOfArrival": "2024-01-15T13:52:52.96Z"}'),
    (-7, -6, -3, '{"Read": false, "Content": "ana ivanovic has started following you", "TimeOfArrival": "2024-01-15T13:53:11.833Z"}'),
    (-8, -6, -5, '{"Read": false, "Content": "ana ivanovic has started following you", "TimeOfArrival": "2024-01-15T13:54:35.032Z"}'),
    (-9, -5, -3, '{"Read": false, "Content": "Stefan Stojanovic has started following you", "TimeOfArrival": "2024-01-15T13:56:21.417Z"}');

INSERT INTO blog."Blogs"(
    "Id", "Title", "Description", "CreationDate", "Status", "UserId", "RatingSum", "Ratings")
VALUES (
    -1,
    'Unveiling the Mystical Marvels: A Whimsical Expedition through Enchanted Lands',
    '## Introduction

Embark on a journey like never before as we delve into the heart of mystical landscapes and unearth the secrets hidden within. Our expedition promises a fusion of awe-inspiring scenery, cultural wonders, and a touch of magic that will leave you spellbound. Join us on this extraordinary adventure as we navigate through the ethereal realms of wonder.

---

##  The Portal Opens

The expedition kicks off with a magical portal awaiting your arrival. ! Step through and leave the ordinary world behind as you enter a realm where reality blends seamlessly with fantasy. 

---

## Enchanting Landscapes

Our first stop takes us through breathtaking landscapes straight out of a fairy tale. From rolling hills adorned with vibrant wildflowers to majestic waterfalls that seem to defy gravity, each step unravels the natural beauty that defines these enchanted lands. ![Landscapes](https://www.explore.com/img/gallery/the-50-most-incredible-landscapes-in-the-whole-entire-world/intro-1672072042.jpg)

---

##  Whispers of Ancient Wisdom

Amidst the captivating scenery, we encounter wise elders and mystics who hold the keys to ancient knowledge. Their tales, passed down through generations, reveal the rich history and wisdom that permeate the very essence of these magical realms. !

---

##  Cultural Kaleidoscope

Immerse yourself in the vibrant cultures that thrive in these mystical lands. From lively festivals celebrating celestial unions to traditional dances that echo through the valleys, every moment is a celebration of life, love, and the extraordinary. ![Cultural Festival](https://triangleonthecheap.com/wordpress/wp-content/uploads/2017/10/american-indian-heritage-celebration-2.jpg)

---

##  Creatures of Fantasy

No mystical expedition is complete without encountering fantastical creatures. From graceful unicorns that prance through moonlit meadows to mischievous sprites playing hide-and-seek in the shadows, each encounter is a testament to the magical biodiversity that thrives in this realm. !

---

## The Celestial Symphony

As the expedition unfolds, witness the celestial symphony that graces these enchanted lands. Starlit skies come alive with dancing constellations, and the moon weaves tales of its own. Its a spectacle that transcends imagination and leaves a lasting imprint on the soul. !

---

Our whimsical expedition through these enchanted lands has come to an end, but the memories will linger forever. The magic weve experienced is not confined to the realms we visited but resonates within us, inviting us to carry a piece of the extraordinary in our hearts as we return to the ordinary.

Dare to dream, for in the world of enchantment, dreams are the threads that weave the fabric of reality. Until the next adventure, may your days be touched by the mystical marvels weve uncovered together.',
    '2024-01-15 13:42:33.109316+01',
    1,
    -3,
    0,
    '[]'
);

INSERT INTO blog."Blogs"(
    "Id", "Title", "Description", "CreationDate", "Status", "UserId", "RatingSum", "Ratings")
VALUES (
    -2,
    'Exploring the Hidden Treasures: A Journey through Novi Sad and Fruska Gora',
    '## Introduction

Buckle up for an immersive adventure as we navigate the charming city of Novi Sad and traverse the picturesque landscapes of Fruska Gora. This journey promises a delightful blend of cultural richness, historical marvels, and the serene beauty of nature. Join us as we unveil the hidden treasures woven into the tapestry of this enchanting region.

---

## Novi Sad - Gateway to the North

Our journey begins in the heart of Vojvodina, Serbia, with the vibrant city of Novi Sad. Nestled along the banks of the Danube River, Novi Sad welcomes us with its baroque architecture, lively atmosphere, and a tapestry of cultures that have shaped its identity over the centuries.

---

## Petrovaradin Fortress - A Timeless Citadel

Dominating the Danubes skyline, Petrovaradin Fortress stands as a testament to Novi Sads rich history. Explore the labyrinthine tunnels, walk the historic ramparts, and absorb the panoramic views of the city below. The fortress is a living relic that whispers tales of bygone eras.

![Petrovaradin Fortress](https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/39/ad/cc.jpg)

---

## The Danube Promenade

Stroll along the enchanting Danube promenade, where the rivers gentle current mirrors the tranquility of the city. Admire the elegant architecture lining the waterfront, indulge in local delicacies at riverside cafes, and feel the pulse of Novi Sads vibrant energy.

![Danube Promenade](https://media.istockphoto.com/id/1217963688/photo/novi-sad.jpg?s=612x612&w=0&k=20&c=cA8ZIsB-9k0XkMcQ5LlSynIxpmIKaJS3WWLge3tYaTY=)

---

## Fruska Gora - Natures Sanctuary

Leaving the city behind, our journey takes us to the serene haven of Fruska Gora National Park. Lush greenery, diverse flora, and fauna, and ancient monasteries dotting the landscape characterize this nature lovers paradise.

![Vidikovac](https://static.wixstatic.com/media/f0dcb1_9522cdb646684aca8badecf55d32615b~mv2.jpg/v1/fill/w_736,h_500,al_c,q_85/f0dcb1_9522cdb646684aca8badecf55d32615b~mv2.jpg)

---

## Monastic Marvels

Explore the hidden gems of Fruska Gora – its monasteries. Dating back to medieval times, these monastic complexes offer a glimpse into the regions spiritual and cultural heritage. Wander through peaceful courtyards and marvel at centuries-old frescoes that adorn the chapel walls.

---

## Wine Tasting in Fruska Gora

No journey through this region is complete without savoring its wines. Fruska Gora is renowned for its vineyards, and a wine tasting experience amidst the rolling hills provides a perfect finale to our adventure. Indulge in local varieties while soaking in the panoramic views of the vine-covered landscapes.

---

# Conclusion

As our exploration through Novi Sad and Fruska Gora comes to an end, the memories of this enchanting journey will linger. From the cultural richness of Novi Sad to the serene beauty of Fruska Gora, every moment is a celebration of the regions diverse tapestry.

May this journey inspire you to explore the hidden treasures within your own surroundings, for in every corner, there lies a story waiting to be told. Until the next adventure, embrace the beauty that surrounds you and let the spirit of exploration guide your path. Safe travels!',
    '2024-01-15 14:54:06.128961+01',
    4,
    -3,
    0,
    '[]'
);

INSERT INTO blog."Blogs"(
    "Id", "Title", "Description", "CreationDate", "Status", "UserId", "RatingSum", "Ratings")
VALUES (
    -3,
    'Discovering the Wonders: A Quest through Mythical Realms',
    '## Introduction\n\nEmbark on a mythical journey as we delve into the enchanting realms of magic and wonder. This quest promises to unveil the hidden mysteries, mythical creatures, and ethereal landscapes that exist beyond the boundaries of the ordinary. Join us on this magical adventure and let your imagination soar!\n\n---\n\n## The Portal of Legends\n\nOur quest begins at the mystical Portal of Legends, a gateway to realms unknown. Step through its shimmering veil and leave the mundane world behind as you enter a dimension where myths come to life.\n\n---\n\n## Mystical Creatures\n\nEncounter majestic creatures that inhabit these mythical realms. From wise dragons guarding ancient treasures to playful phoenixes soaring through the skies, every encounter is a testament to the magical biodiversity that thrives in this enchanted world.\n\n---\n\n## Ethereal Landscapes\n\nJourney through breathtaking landscapes that defy the laws of nature. Floating islands adorned with vibrant flora, cascading waterfalls that flow upwards, and forests where the trees whisper ancient secrets—all contribute to the otherworldly beauty of these realms.\n\n---\n\n## Tales of Old\n\nAmidst the magical landscapes, listen to tales of old from wise sages and ancient storytellers. These stories, passed down through generations, carry the wisdom of the mythical realms, revealing the intricate tapestry of their history and legends.\n\n---\n\n## Celestial Phenomena\n\nWitness celestial phenomena that paint the skies with hues unseen in the mortal world. From shimmering auroras that dance with the stars to moonlit festivals hosted by celestial beings, the wonders of the night sky are a spectacle to behold.\n\n---\n\n## The Quests End\n\nAs our quest through mythical realms comes to an end, the memories of magical encounters and fantastical landscapes will forever linger. Though we return to the realm of the ordinary, the spark of magic within us remains, inviting us to believe in the extraordinary.\n\nDare to dream, for in the world of myth and magic, dreams are the threads that weave the fabric of reality. Until the next quest, may your days be touched by the wonders weve discovered together.',
    '2024-01-15 15:30:45.789012+01',
    1,
    0,
    0,
    '[]'
);

INSERT INTO blog."Blogs"(
    "Id", "Title", "Description", "CreationDate", "Status", "UserId", "RatingSum", "Ratings")
VALUES (
  -4,
  'Exploring Palić: A Lakeside Retreat',
  '## Introduction

Welcome to Palić, a hidden gem nestled in the northern part of Serbia. This quaint town, wrapped around the serene Palić Lake, offers a perfect escape for those seeking tranquility and natural beauty. Join us as we embark on a journey through the charming streets, lush parks, and the enchanting lakefront of Palić.

---

## Lakeside Tranquility

Our journey begins with the picturesque Palić Lake, a shimmering oasis surrounded by lush greenery. Take a leisurely stroll along the lakeside promenade, breathe in the fresh air, and let the soothing sounds of nature create a sense of serenity.

![Palić Lake](data:image/jpeg;base64,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)

---

## Art Nouveau Architecture

Explore the rich history and architectural beauty of Palić as you wander through the towns streets. Marvel at the well-preserved Art Nouveau buildings that showcase the towns elegant charm and offer a glimpse into its cultural heritage.

![Art Nouveau Architecture](https://www.suboticasinagoga.rs/sites/default/files/inline-images/23.jpg)

---

## Palić Park - Natures Haven

Step into Palić Park, a verdant oasis that complements the towns beauty. Stroll through tree-lined pathways, discover hidden alcoves, and bask in the beauty of colorful flowerbeds. The park provides a perfect setting for a leisurely afternoon.

![Palić Park](https://sobeiapartmani.com/wp-content/uploads/2022/01/palic1a.jpg)

---

## Grand Terrace - A Culinary Journey

Indulge your taste buds at the iconic Grand Terrace, overlooking Palić Lake. Enjoy a culinary journey with a blend of traditional Serbian flavors and international cuisine. The picturesque view enhances the dining experience, creating memories that linger.

![Grand Terrace](https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/61/f7/7a/park-heroja.jpg?w=500&h=400&s=1)

---

## Thermal Springs and Wellness

Palić is renowned for its thermal springs that have been attracting visitors for centuries. Immerse yourself in the rejuvenating waters of the Palić Thermal Springs or pamper yourself with spa treatments, embracing the towns wellness offerings.


---

## Chapter 6: Sunset Serenade

As the day winds down, witness the enchanting sunset over Palić Lake. Find a quiet spot along the shore, watch the sky transform into a canvas of warm colors, and let the tranquil beauty of Palić leave an everlasting impression.

![Sunset at Palić Lake](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpvsmNtR4OWc_mcFwHncWbzeg_A4Hh8laxGTwLFAyHyLZ2Q3JuSSMwRbhdaN_Tby4RCKM&usqp=CAU)

---

# Conclusion

Our exploration of Palić concludes, leaving behind memories of lakeside tranquility, architectural elegance, and culinary delights. Palić, with its timeless charm, invites you to embrace the slow pace of life and connect with nature.

May this glimpse into Palić inspire you to embark on your own adventure and discover the hidden treasures of this lakeside retreat. Until the next journey, may your travels be filled with serenity and the joy of discovery. Safe travels!',
'2024-01-15 14:52:15.171213+01',
4,
-4,
0,
'[]'
);

INSERT INTO blog."Blogs"(
    "Id", "Title", "Description", "CreationDate", "Status", "UserId", "RatingSum", "Ratings")
VALUES (
  -5,
  'Đerdap: Exploring the Danubes Majestic Gorge',
  '## Introduction

Welcome to Đerdap, a natural wonder where the mighty Danube River cuts through the Carpathian Mountains, creating a breathtaking gorge. Join us on a journey through history, stunning landscapes, and the enchanting allure of one of Europes most captivating regions.

---

## The Gates of Iron

Đerdap, often referred to as the "Iron Gates," is a striking gorge where the Danube River winds its way through sheer cliffs. Witness the mesmerizing spectacle of the river slicing through the Carpathians, creating a gateway of unparalleled natural beauty.


---

## Lush Danube National Park

Explore the lush beauty of the Đerdap National Park that surrounds the gorge. Dense forests, diverse flora, and fauna, along with numerous hiking trails, offer a haven for nature enthusiasts. Take in the panoramic views and immerse yourself in the tranquility of this natural oasis.

![Danube National Park](data:image/jpeg;base64,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)

---

## Ancient Trajans Bridge

Marvel at the remnants of the ancient Trajans Bridge, a testament to the regions rich history. Built by the Romans, this engineering marvel once spanned the Danube, connecting the two banks. Today, the ruins provide a glimpse into the past.


---

##  River Cruises and Boat Tours

Experience the majesty of Đerdap from the water with a river cruise or boat tour. Sail through the narrow passages, witness the towering cliffs, and appreciate the geological wonders that have shaped this incredible landscape.

![River Cruise](https://static.wixstatic.com/media/b27ecd_a75435140d6f431f86c984ce51d111dc~mv2.jpg/v1/fill/w_560,h_372,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Brod-Djerdap_edited.jpg)

---

## Golubac Fortress

Perched on the banks of the Danube, Golubac Fortress is a medieval gem guarding the entrance to the Đerdap Gorge. Explore its towers, walls, and captivating views, and let the centuries-old stones whisper tales of battles and conquests.

![Golubac Fortress](https://www.serbianprivatetours.com/wp-content/uploads/2020/10/Golubac-fortress-featured.jpg)

---

##  Sunset Over Đerdap

As the day draws to a close, dont miss the opportunity to witness a Đerdap sunset. The play of colors on the cliffs and the reflection on the Danube create a breathtaking panorama, leaving an indelible mark on all who are fortunate enough to witness it.

![Đerdap Sunset](https://img.freepik.com/premium-photo/view-sunset-danube-gorge-djerdap-serbia_52137-41091.jpg)

---

# Conclusion

Our exploration of Đerdap concludes, leaving us with memories of rugged beauty, ancient history, and the timeless flow of the Danube. May this glimpse into the Iron Gates inspire you to embark on your own journey and discover the wonders that nature and history have woven together in this remarkable region. Until the next adventure, may your travels be filled with awe and discovery. Safe travels!',
'2024-01-15 14:49:21.232321+01',
4,
-5,
0,
'[]'
);

INSERT INTO blog."Comments"("Id", "UserId", "CreationDate", "Description", "LastEditDate", "BlogId")
VALUES
(-1, -7, '2024-01-15 14:49:21.074+01', 'Wow, what an incredible journey through Đerdap! The images of the gorge are absolutely mesmerizing, and your descriptions bring the region to life. I had no idea about the ancient Trajans Bridge, and the sunset over Đerdap looks like something out of a dream. The mix of history, nature, and adventure is truly captivating. This blog has definitely inspired me to add Đerdap to my travel bucket list. Cant wait to experience the Gates of Iron in person. Thanks for sharing this enchanting adventure!', '2024-01-15 14:49:21.074+01', -5),
(-2, -8, '2024-01-15 14:50:39.741+01', 'What an amazing virtual tour through Đerdap! The sunset over the gorge is a sight to behold, and I love how youve highlighted the cultural and historical aspects of the region. The Golubac Fortress seems like a must-visit, and the idea of a river cruise through the Iron Gates is now on the top of my travel wishlist. Your blog has ignited my wanderlust, and I cant wait to experience the magic of Đerdap firsthand. Thank you for sharing this incredible journey!', '2024-01-15 14:50:39.741+01', -5),
(-3, -8, '2024-01-15 14:51:12.237+01', 'This blog beautifully captures the essence of Đerdap! The images showcasing the rugged beauty of the gorge and the ancient Trajans Bridge are truly captivating. I appreciate the historical insights provided, making the journey through this natural wonder even more enriching.', '2024-01-15 14:51:12.237+01', -5),
(-4, -9, '2024-01-15 14:52:15.1+01', 'Palic looks like a hidden paradise! The images of the lake and park are absolutely stunning, and your vivid descriptions make me feel like Im already there. The mention of the Art Nouveau architecture adds a cultural touch to the experience. Im now seriously considering Palic for my next getaway. Thanks for bringing this enchanting destination to my attention!', '2024-01-15 14:52:15.1+01', -4),
(-5, -9, '2024-01-15 14:52:24.981+01', 'This blog on Palic is a breath of fresh air! The Grand Terrace overlooking the lake is now on my must-visit list. Your descriptions of the culinary delights and the cozy atmosphere make it sound like the perfect spot to unwind. The images of Palic Park are so inviting; I can almost feel the tranquility through the screen. Cant wait to experience the beauty of Palic in person!', '2024-01-15 14:52:24.981+01', -4),
(-6, -6, '2024-01-15 14:53:02.653+01', 'Palic seems like a serene escape from the hustle and bustle of everyday life. The sunset at Palic Lake looks magical, and the idea of exploring the Art Nouveau architecture adds a unique charm to the visit. Your blog has sparked my interest, and I can imagine myself leisurely strolling through the park or enjoying a meal at the Grand Terrace. Thanks for sharing the beauty of Palic with us!', '2024-01-15 14:53:02.653+01', -4),
(-7, -6, '2024-01-15 14:53:37.349+01', 'Kopaonik looks like a winter paradise! The images of the snow-covered slopes are breathtaking, and your detailed descriptions of skiing adventures have me itching to hit the slopes. The mention of the Winter Wellness experiences adds an extra layer of relaxation to the trip. Kopaonik is now on my winter travel bucket list!', '2024-01-15 14:53:37.349+01', -3),
(-8, -6, '2024-01-15 14:54:06.066+01', 'Your exploration of Fruska Gora has truly piqued my interest! The images of the lush landscapes and ancient monasteries evoke a sense of tranquility and history. I had no idea about the cultural richness and diversity that the region holds. Fruska Gora has now earned a spot on my travel wishlist. Thank you for showcasing the hidden treasures of this enchanting destination!', '2024-01-15 14:54:06.066+01', -2),
(-9, -6, '2024-01-15 14:55:18.951+01', 'Your exploration of Đerdap is nothing short of mesmerizing! The images of the Gates of Iron and the ancient Trajans Bridge are truly breathtaking. I appreciate the historical insights, and the idea of a river cruise through the gorge has me daydreaming about an unforgettable adventure. Your blog has not only highlighted the natural beauty of Đerdap but also provided a glimpse into its rich history. Im now eager to experience the magic of the Iron Gates myself. Thank you for this virtual journey!', '2024-01-15 14:55:18.951+01', -5),
(-10, -5, '2024-01-15 14:56:43.481+01', 'Your blog about Kopaonik has completely transported me to this snowy wonderland. The skiing adventures, the cozy après-ski scene at Grand Terrace, and the promise of rejuvenating in the thermal springs - it sounds like the perfect winter retreat. The images of the sunset over Kopaonik have me daydreaming about experiencing that magical moment in person. Thanks for sharing this winter adventure!', '2024-01-15 14:56:43.481+01', -3);


INSERT INTO tours."PositionSimulators"(
    "Id", "Latitude", "Longitude", "TouristId")
VALUES 
(-1, 45.244648392133605, 19.847638305710497, -7),
(-2, 45.252836305689165, 19.834531363762274, -8),
(-3, 44.81499760569959, 20.472119344730604, -9),
(-4, 44.78354083744795, 20.463281132842052, -10),
(-5, 45.24564550745057, 19.849849522062556, -6);

INSERT INTO tours."Tour"(
    "Id", "Name", "Description", "Difficulty", "Tags", "Status", "Price", "AuthorId", "Equipment", "DistanceInKm", "ArchivedDate", "PublishedDate", "Durations", "Image")
VALUES 
(-1, 'Walking tour through Novi Sad', 'Discover the cool vibes of Novi Sad on this awesome tour. Check out the badass Petrovaradin Fortress and soak in the history. Wander around the charming Old Town streets with its fancy old buildings. Hit up the buzzing markets for some local grub and crafts. Your guides will spill the tea on the city''s past and present, making this tour a mix of history, culture, and tasty treats for an epic time in Novi Sad.', 0, '{history,culture}', 1, 80, -3, '{}', 1.814866, NULL, '2024-01-16 13:30:09.295298+01', '[{"TimeInSeconds": 3600, "Transportation": 0}]', 'https://bookaweb.s3.eu-central-1.amazonaws.com/media/73794/novi-sad-destinacija-feature.jpg'),
(-2, 'Walking tour through Belgrade', 'Take a stroll through the heart of Belgrade, where the old meets the new seamlessly. Explore the badass Kalemegdan Fortress, perched at the meeting point of the Sava and Danube rivers, giving you killer views of the city. Saunter down the lively Knez Mihailova Street, packed with cool shops, cafes, and historic spots. Dive into the citys vibe as you uncover its dope mix of architecture and hidden gems. Let the city itself spill the tea on its past, making this walk a perfect combo of history, culture, and the real Belgrade spirit.', 1, '{history,nature,culture}', 1, 100, -3, '{}', 4.134201, NULL, '2024-01-16 14:40:26.724641+01', '[{"TimeInSeconds": 9000, "Transportation": 0}]', 'https://i.pinimg.com/originals/57/9f/62/579f6212a8f280fdf62c85b7db0f44f2.jpg'),
(-7, 'Culinary Delights and Cultural Insights', 'Savor the flavors of a rich tapestry of cultures on our Culinary Delights and Cultural Insights tour. This gastronomic journey will lead you through bustling markets, hidden culinary gems, and renowned restaurants, where you''ll indulge in a diverse range of delectable dishes. But it''s not just about the food – immerse yourself in the local culture through hands-on cooking classes, meet passionate chefs, and explore historical sites that narrate the region''s culinary evolution. Join us for a feast for the senses that goes beyond the plate.', 1, '{"adventure", "old", "culture", "beautiful"}', 1, 2000, -5, '{-1}', 3.484371, NULL, '2023-11-16 18:33:45.459049+01', '[{"TimeInSeconds": 2509, "Transportation": 0}]', 'https://itinererblog.files.wordpress.com/2017/04/divcibare-maljen-rior-2019-12.jpg?w=1024'),
(-8, 'Mystical Adventure in Ancient Ruins', 'Uncover the secrets of the past on our Mystical Adventure in Ancient Ruins tour. Step back in time as you explore the enigmatic remnants of ancient civilizations. Roam through historic ruins, decipher ancient hieroglyphs, and marvel at architectural marvels that have withstood the test of time. Expert archaeologists will guide you through the stories etched in stone, revealing the mysteries of bygone eras. This immersive journey promises a blend of history, archaeology, and awe-inspiring landscapes, making it an unforgettable adventure for history enthusiasts and curious minds alike.', 3, '{"hike"}', 1, 1000, -4, '{-1, -3}', 3.484371,  '2023-11-16 18:33:42.718996+01', '2023-11-16 18:33:45.459049+01', '[{"TimeInSeconds": 2509, "Transportation": 0}]', 'https://t3.ftcdn.net/jpg/00/12/40/80/360_F_12408034_ybgU8WgXyhJX2jGkYuojiScQCjeTKGD8.jpg'),
(-9, 'Enchanting Wilderness Expedition', 'Embark on a journey through nature''s untouched beauty with our Enchanting Wilderness Expedition. This tour takes you deep into the heart of lush forests, serene lakes, and breathtaking landscapes. Traverse scenic trails, witness diverse wildlife, and camp under the starlit sky. Expert guides will share their knowledge of the flora and fauna, ensuring an immersive and educational experience. Disconnect from the hustle and bustle of daily life as you connect with the enchanting wilderness on this rejuvenating adventure.', 3, '{"history", "walking"}', 1, 900, -4, '{-1}', 3.484371, NULL, '2023-11-16 18:33:45.459049+01', '[{"TimeInSeconds": 2509, "Transportation": 0}]', 'https://live.staticflickr.com/4704/38953202795_521308d2ef_b.jpg');

INSERT INTO tours."TourKeyPoints"(
    "Id", "Name", "Description", "Image", "Latitude", "Longitude", "TourId", "Secret", "PositionInTour", "PublicPointId", "Discriminator", "Status", "CreatorId")
VALUES 
(-1, 'Name of Mary Church', 'The Name of Mary Church is a Roman Catholic parish church in Novi Sad, Serbia, dedicated to the feast of the Holy Name of Mary. It is the largest church in Novi Sad, and is located in the city centre on the Trg Slobode.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Serbia-0268_-_Name_of_Mary_Parish_Church_%287344449164%29.jpg/800px-Serbia-0268_-_Name_of_Mary_Parish_Church_%287344449164%29.jpg', 45.255287162807655, 19.84538555145264, -1, 'This is the third tallest church in Bačka, after the Church of Saint Virgin Mary in Bačka Topola and the Church of Saint Stephan in Sombor, dominating the city center of Novi Sad.', 0, NULL, 'TourKeyPoint', NULL, NULL),
(-2, 'Dunavski Park', 'Danube Park or Dunavski Park is an urban park in the downtown of Novi Sad, the capital of the Vojvodina Province, Serbia. Formed in 1895, it is protected as the natural monument and is one of the symbols of the city.', 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Свјетлопис_дијела_Дунавског_парка%2C_Нови_Сад.jpg', 45.25606129446143, 19.85036373138428, -1, 'The name of the park, Dunavski park, means the Danube park. However, though near the river, the park was named after the Dunavska ulica ("Danube Street"), which encircles it on the north.', 1, NULL, 'TourKeyPoint', NULL, NULL),
(-3, 'Petrovaradin Fortress', 'Petrovaradin Fortress, nicknamed "Gibraltar on/of the Danube", is a fortress in the town of Petrovaradin, itself part of the City of Novi Sad, Serbia. It is located on the right bank of the Danube river. The cornerstone of the present-day southern part of the fortress was laid on 18 October 1692 by Charles Eugène de Croÿ. Petrovaradin Fortress has many tunnels as well as 16 kilometres of uncollapsed underground countermine system. In 1991 Petrovaradin Fortress was added to Spatial Cultural-Historical Units of Great Importance list of the Republic of Serbia.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Petrovaradin_Fortress_%28Péterváradi_vár%2C_Peterwardein%29.JPG/1920px-Petrovaradin_Fortress_%28Péterváradi_vár%2C_Peterwardein%29.JPG', 45.25310443234475, 19.861232042312626, -1, 'EXIT festival is an annual summer music festival that has been held at the fortress since its inception in 2001. Since then, it has grown from the biggest festival in South-Eastern Europe, to one of the biggest in Europe.', 2, NULL, 'TourKeyPoint', NULL, NULL),
(-4, 'Church of Saint Sava', 'The Church of Saint Sava is a Serbian Orthodox church which sits on the Vračar plateau in Belgrade, Serbia. It was planned as the bishopric seat and main cathedral of the Serbian Orthodox Church. The church is dedicated to Saint Sava, the founder of the Serbian Orthodox Church and an important figure in medieval Serbia. It is built on the presumed location of St. Sava''s grave. His coffin had been moved from Mileševa Monastery to Belgrade. The Church of Saint Sava stands with commanding dimensions, featuring a length of 91 meters, a width of 81 meters, and reaching an impressive height of 78.3 meters from ground to cross.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Hram_svetog_save_beograd_0005.jpg/1280px-Hram_svetog_save_beograd_0005.jpg', 44.79819031426611, 20.46911716461182, -2, 'As the largest Orthodox church in the Balkans, it holds a capacity of 7,000, and globally, it claims the title of the second-largest Orthodox church in the world.', 0, NULL, 'TourKeyPoint' , NULL, NULL),
(-5, 'House of the National Assembly of the Republic of Serbia', 'The House of the National Assembly of the Republic of Serbia is the seat of the National Assembly of Serbia. The building is on Nikola Pašić Square in downtown Belgrade, and is a landmark and tourist attraction.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/ParlamentBelgrad.jpg/1920px-ParlamentBelgrad.jpg', 44.811473656435886, 20.465276241302494, -2, 'Secret about House of the National Assembly of the Republic of Serbia', 1, NULL, 'TourKeyPoint', NULL, NULL),
(-6, 'Knez Mihailova Street', 'Knez Mihailova Street is the main pedestrian and shopping zone in Belgrade, and is protected by law as one of the oldest and most valuable landmarks of the city. Named after Mihailo Obrenović III, Prince of Serbia, it features a number of buildings and mansions built during the late 1870s.', 'https://noviapartmani.com/public/upload/blog/2016/06/vodic-kroz-beograd-knez-mihailova-vodic-beograd-apartmani-_blog_default.jpg', 44.817821176382594, 20.45688629150391, -2, 'One kilometer long Knez Mihailova Street was protected in 1964 as the spatial cultural-historical unit, the first cultural monument of that type in Belgrade.', 2, NULL, 'TourKeyPoint', NULL, NULL),
(-7, 'Kalemegdan Park', 'The Kalemegdan Park, or simply Kalemegdan is the largest park and the most important historical monument in Belgrade. It is located on a 125-metre-high cliff, at the junction of the River Sava and the Danube. Kalemegdan Park, split in two as the Great and Little Parks, was developed in the area that once was the town field within the Belgrade Fortress. Today residents often erroneously refer to the entire fortress as the Kalemegdan Fortress or just Kalemegdan.', 'https://www.srbijapodlupom.com/wp-content/uploads/2021/03/160710593_145857260664276_2242450187315652358_n.jpg', 44.82241013510195, 20.450019836425785, -2, 'The biggest mystery of Belgrade is hidden on Kalemegdan. The Belgrade Fortress covers two thousand years of history that, unfortunately, because of everything that lies beneath that place, will not be fully explored. Everything that during the two millennia was the last cry of technique in military terms was on the Calemegdan Cape, from the Romans to the Serbs.', 3, NULL, 'TourKeyPoint', NULL, NULL),
(-20, 'Public Key Point Telep', 'Telep is an urban district located in the western part of Novi Sad, covering an area of 3.45 km', 'https://live.staticflickr.com/2906/14716995446_c1191fc2e6_b.jpg', 45.232164904903826, 19.794790780707856, NULL, '', NULL,  NULL, 'PublicTourKeyPoints', 0, -4),
(-21, 'Public Key Point Spens', 'The Sports and Business Center Vojvodina (SBC Vojvodina), popularly known as the acronym Spens (full name: European Table Tennis Championship Novi Sad), is a sports and business center located in Novi Sad, in the part of the city called Stari Grad. The construction of the hall began in May 1979, and it was opened on April 14, 1981, for the 36th World Table Tennis Championship.', 'https://static.rtv.rs/slike/2020/03/16/novi-sad-spens-jkp-sportski-i-poslovni-centar-vojvodina-10.jpg', 45.24628421561786, 19.84560012817383, NULL, '', NULL, NULL, 'PublicTourKeyPoints', 0, -4),
(-22, 'Public Key Point Kamenica', 'Kamenica Park is located on the northern slope of Fruska Gora and extends along the entire length to the right bank of the Danube River. It covers an area of approximately 33 hectares, making it the largest park in Novi Sad in terms of surface area. It is situated 7 km from Novi Sad, at the entrance to Sremska Kamenica.', 'https://ilovenovisad.com/wp-content/uploads/2016/02/Kameni%C4%8Dki-park-2.jpg', 45.22383648719875, 19.846165773318674, NULL, '', NULL, NULL, 'PublicTourKeyPoints', 0, -4),
(-23, 'Tacka 1', 'Tacka 1 je prva tacka', 'https://www.travelandleisure.com/thmb/O_l4b5JDWtEWKQ7mE7PoA3rQdVk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cascade-mountains-range-USMNTNS0720-db9bdf21ee2e47b1868232c551c01006.jpg', 44.8125, 20.4612, -7, 'Secret 1', 0, NULL, 'TourKeyPoint', NULL, NULL),
(-24, 'Tacka 2', 'Tacka 2 je druga tacka', 'https://i.insider.com/5a2586ab3339b038248b45ab?width=1000&format=jpeg&auto=webp', 44.1111, 20.5589, -7, 'Secret 2', 1, NULL,'TourKeyPoint', NULL, NULL),
(-25, 'Tacka 1', 'Tacka 1 je prva tacka', 'https://i.insider.com/5a2586ab3339b038248b45ab?width=1000&format=jpeg&auto=webp', 45.24616355261428, 19.820365905761722, -8, 'Secret 1', 0, NULL, 'TourKeyPoint', NULL, NULL),
(-26, 'Tacka 2', 'Tacka 2 je druga tacka', 'https://www.travelandleisure.com/thmb/O_l4b5JDWtEWKQ7mE7PoA3rQdVk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cascade-mountains-range-USMNTNS0720-db9bdf21ee2e47b1868232c551c01006.jpg', 45.24628421561786, 19.843760255270002, -8, 'Secret 2', 1, NULL, 'TourKeyPoint', NULL, NULL),
(-27, 'Javna 1 (u turi -9)', 'Lepa kt', 'https://www.snow-forecast.com/system/images/36932/large/Crystal-Mountain.jpg?1619614348', 45.232164904903826, 19.794790780707856, -9, '', 0, -20, 'TourKeyPoint', NULL, NULL),
(-28, 'Javna 3 (u turi -9)', 'Najlepsa kt', 'https://wallpapers.com/images/featured/snow-mountain-ydg6x966wun8nkjs.jpg', 45.24628421561786, 19.84560012817383, -9, '', 1, -21, 'TourKeyPoint', NULL, NULL),
(-29, 'Javna 4 (u turi -9)', 'nova javna kt', 'https://cdn.britannica.com/97/158797-050-ABECB32F/North-Cascades-National-Park-Lake-Ann-park.jpg', 45.22383648719875, 19.846165773318674, -9, '', 2, -22, 'TourKeyPoint', NULL, NULL);

INSERT INTO tours."Tour"(
	"Id", "Name", "Description", "Difficulty", "Tags", "Status", "Price", "AuthorId", "Equipment", "DistanceInKm", "ArchivedDate", "PublishedDate", "Durations", "Image")
	VALUES (-3, 'Naturs Serenity Trail', 'Embark on a serene adventure through lush landscapes and tranquil paths. This nature-focused tour invites you to reconnect with the great outdoors, showcasing breathtaking views, soothing sounds, and the beauty of untouched wilderness.', 0, '{culture,walking}', 1, 40,-3, '{}', 35.186862999999995, null, '2024-01-17 12:38:39.115698+01', '[
  {
    "TimeInSeconds": 7380,
    "Transportation": 1
  }
]', 'https://images.unsplash.com/photo-1592859600972-1b0834d83747?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwdHJhaWx8ZW58MHx8MHx8fDA%3D');

INSERT INTO tours."Tour"(
	"Id", "Name", "Description", "Difficulty", "Tags", "Status", "Price", "AuthorId", "Equipment", "DistanceInKm", "ArchivedDate", "PublishedDate", "Durations", "Image")
	VALUES (-4, 'Historic Gems Expedition', ' Step back in time and uncover the rich tapestry of history woven through the city streets. This immersive tour guides you through centuries-old architecture, storied landmarks, and tales of the past, offering a glimpse into the fascinating history of our vibrant community.', 2, '{history,culture}', 1, 135, -3, '{}', 6.6443140000000005, null, '2024-01-17 12:48:25.8825+01', '[
  {
    "TimeInSeconds": 3600,
    "Transportation": 0
  }
]', 'https://www.gradnja.rs/wp-content/uploads/2019/04/golubacka-tvdjava-02.jpg');

INSERT INTO tours."Tour"(
	"Id", "Name", "Description", "Difficulty", "Tags", "Status", "Price", "AuthorId", "Equipment", "DistanceInKm", "ArchivedDate", "PublishedDate", "Durations", "Image")
	VALUES (-5, 'Culinary Delights Discovery Route', 'Savor the flavors of our diverse culinary landscape on this gastronomic journey. From savory street eats to gourmet delights, this tour promises a delectable experience for your taste buds, celebrating the unique and delicious offerings of our citys food scene.', 0, '{food,culture}', 1, 200, -4, '{}', 1.628329, null, '2024-01-17 12:56:00.780197+01', '[
  {
    "TimeInSeconds": 10800,
    "Transportation": 0
  }
]', 'https://www.touristsecrets.com/wp-content/uploads/2023/10/the-universal-pleasures-of-indulgent-road-trip-food-1697026199.jpg');

INSERT INTO tours."Tour"(
	"Id", "Name", "Description", "Difficulty", "Tags", "Status", "Price", "AuthorId", "Equipment", "DistanceInKm", "ArchivedDate", "PublishedDate", "Durations", "Image")
	VALUES (-6, 'Artistic Odyssey: Galleries & Street Murals Expedition', ' Immerse yourself in a vibrant world of creativity as you explore art galleries and colorful street murals. This tour showcases the citys thriving art scene, where each stroke tells a story and every masterpiece reflects the unique spirit of our artistic community.', 2, '{art,history}', 1, 30, -4, '{}', 5.0863130000000005, null, '2024-01-17 13:01:31.721677+01', '[
  {
    "TimeInSeconds": 9000,
    "Transportation": 2
  }
]', 'https://cdn.britannica.com/51/194651-050-747F0C18/Interior-National-Gallery-of-Art-Washington-DC.jpg');


INSERT INTO tours."TourKeyPoints"(
	"Id", "Name", "Description", "Image", "Latitude", "Longitude", "TourId", "Secret", "PositionInTour", "PublicPointId", "Discriminator", "Status", "CreatorId")
	VALUES (-8, 'Tranquil Meadow Overlook', 'Begin your journey at the Tranquil Meadow Overlook, where rolling hills and a carpet of wildflowers provide a picturesque start to the trail. Take in the peaceful ambiance as you set the tone for a nature-filled exploration', 'data:image/jpeg;base64,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', 45.151779635881404, 19.586563110351566, -3, 'The meadow is home to a rare species of butterfly that only emerges during the first hour of dawn, adding a touch of magic to the early morning scene.', 0, null, 'TourKeyPoint',null,null);


INSERT INTO tours."TourKeyPoints"(
	"Id", "Name", "Description", "Image", "Latitude", "Longitude", "TourId", "Secret", "PositionInTour", "PublicPointId", "Discriminator", "Status", "CreatorId")
	VALUES (-9, 'Whispering Woods Path', 'Follow the meandering Whispering Woods Path, surrounded by towering trees and the gentle rustle of leaves. This shaded trail offers a cool respite and a chance to appreciate the harmonious blend of sunlight filtering through the foliage.', 'data:image/jpeg;base64,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', 45.156621868090305, 19.794616699218754, -3, 'The oldest tree along the path, known as the "Whispering Sentinel," is said to have stood witness to centuries of changing seasons and silently shares its wisdom with those who listen.',1, null, 'TourKeyPoint', null, null);


INSERT INTO tours."TourKeyPoints"(
	"Id", "Name", "Description", "Image", "Latitude", "Longitude", "TourId", "Secret", "PositionInTour", "PublicPointId", "Discriminator", "Status", "CreatorId")
	VALUES (-10, 'Cascade Harmony Falls', 'Discover the mesmerizing Cascade Harmony Falls, a hidden gem tucked away in the heart of the trail. The soothing sound of cascading water and the sight of sunlight dancing on the surface create a tranquil oasis in the midst of nature.', 'https://miro.medium.com/v2/resize:fit:1358/1*yDHaCGDGWi2fobNvttlvbw.jpeg', 45.15468502457952, 19.890747070312504, -3, 'Legend has it that the waters of Harmony Falls are said to have healing properties, and local wildlife often gather here for the revitalizing benefits.', 2, null, 'TourKeyPoint', null, null);


INSERT INTO tours."TourKeyPoints"(
	"Id", "Name", "Description", "Image", "Latitude", "Longitude", "TourId", "Secret", "PositionInTour", "PublicPointId", "Discriminator", "Status", "CreatorId")
	VALUES (-11, 'Avian Symphony Point', 'Reach Avian Symphony Point, where a diverse array of birds creates a natural symphony. Listen to their melodies as you observe these feathered performers in their habitat, adding a delightful auditory dimension to your nature experience.', 'data:image/jpeg;base64,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', 45.150326885987994, 19.93057250976563, -3, 'Ornithologists have identified a rare species of songbird that migrates to this point each year, contributing unique and melodious tunes to the avian symphony.', 3, null, 'TourKeyPoint', null, null);

INSERT INTO tours."TourKeyPoints"(
	"Id", "Name", "Description", "Image", "Latitude", "Longitude", "TourId", "Secret", "PositionInTour", "PublicPointId", "Discriminator", "Status", "CreatorId")
	VALUES (-12, 'Victorian Elegance Avenue', 'Stroll along Victorian Elegance Avenue, lined with meticulously preserved Victorian-style mansions. Each building tells a story of opulence and societal changes during the 19th century, providing a glimpse into the lives of the citys elite.', 'https://circaoldhouses.com/wp-content/uploads/2024/01/20180430_075353-1170x785.jpg', 44.75508403980293, 20.427532196044922, -4, 'The avenue is home to the citys oldest functioning carousel, tucked away in a charming Victorian pavilion, and open to the public once a year during a secret event.', 0, null, 'TourKeyPoint', null, null);


INSERT INTO tours."TourKeyPoints"(
	"Id", "Name", "Description", "Image", "Latitude", "Longitude", "TourId", "Secret", "PositionInTour", "PublicPointId", "Discriminator", "Status", "CreatorId")
	VALUES (-13, 'Revolutionary Resurgence Square', 'Visit Revolutionary Resurgence Square, where statues and monuments commemorate pivotal moments in the citys struggle for independence. Immerse yourself in the energy of this square, where the spirit of revolution still lingers.', 'data:image/jpeg;base64,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', 44.753438357252875, 20.454826354980472, -4, 'The square conceals a hidden chamber beneath one of its statues, believed to house a time capsule containing artifacts and letters from the citys founding fathers.', 1, null, 'TourKeyPoint', null, null);

INSERT INTO tours."TourKeyPoints"(
	"Id", "Name", "Description", "Image", "Latitude", "Longitude", "TourId", "Secret", "PositionInTour", "PublicPointId", "Discriminator", "Status", "CreatorId")
	VALUES (-14, 'Street Food Extravaganza Plaza', 'Dive into the Street Food Extravaganza Plaza, where local vendors dish out a symphony of flavors. From tantalizing tacos to mouthwatering kebabs, this bustling plaza is a feast for the senses.', 'https://ocdn.eu/images/pulscms/YTg7MDA_/321d2630a9c85dd564a0cfaaca6c6e63.jpg', 45.2567938776246, 19.848260879516605, -5, 'A hidden alley adjacent to the plaza unveils a clandestine kitchen where chefs experiment with fusion cuisine, creating unexpected culinary masterpieces.', 0, null, 'TourKeyPoint', null, null);

INSERT INTO tours."TourKeyPoints"(
	"Id", "Name", "Description", "Image", "Latitude", "Longitude", "TourId", "Secret", "PositionInTour", "PublicPointId", "Discriminator", "Status", "CreatorId")
	VALUES (-15, 'Spice Market Bazaar', ' Immerse yourself in the Spice Market Bazaar, where aromatic spices and herbs create a sensory explosion. Wander through the stalls, discovering exotic ingredients that add a touch of magic to the citys culinary tapestry.', 'https://mlrhpz8jmuut.i.optimole.com/cb:Ie5o.50122/w:710/h:473/q:mauto/ig:avif/f:best/https://www.egypttoursplus.com/wp-content/uploads/2014/03/displays-of-products-on-offer-in-the-Spice-market-in-Istanbul-Turkey.jpg', 45.25150698301125, 19.850578308105472, -5, ' A discreet door within the bazaar leads to an underground spice cellar, housing rare and ancient spices that are carefully guarded by local spice merchants.', 1, null, 'TourKeyPoint', null, null);

INSERT INTO tours."TourKeyPoints"(
	"Id", "Name", "Description", "Image", "Latitude", "Longitude", "TourId", "Secret", "PositionInTour", "PublicPointId", "Discriminator", "Status", "CreatorId")
	VALUES (-16, 'Seafood Sensation Wharf', ' Journey to the Seafood Sensation Wharf, where the days catch transforms into culinary masterpieces. Enjoy the fresh sea breeze as you indulge in a variety of seafood dishes prepared by skilled chefs.', 'https://media-cdn.tripadvisor.com/media/photo-s/1a/98/4d/3d/photo0jpg.jpg', 45.247110933047, 19.855985641479496, -5, 'Beneath the wharf, a hidden seafood laboratory conducts sustainable fishing research, ensuring the longevity of the citys rich maritime culinary traditions.', 2, null, 'TourKeyPoint', null, null);

INSERT INTO tours."TourKeyPoints"(
	"Id", "Name", "Description", "Image", "Latitude", "Longitude", "TourId", "Secret", "PositionInTour", "PublicPointId", "Discriminator", "Status", "CreatorId")
	VALUES (-17, 'Gallery District Showcase', 'Begin your artistic odyssey in the Gallery District Showcase, a hub of contemporary and traditional art galleries. From avant-garde installations to classical paintings, this district offers a diverse range of artistic expressions.', 'https://theartofeducation.edu/wp-content/uploads/2023/02/Photo-1-1.png', 45.25102358523225, 19.79942321777344, -6, 'One gallery in the district hosts exclusive midnight showings, featuring avant-garde performances and interactive exhibits, accessible only to those in-the-know.', 0, null, 'TourKeyPoint', null, null);

INSERT INTO tours."TourKeyPoints"(
	"Id", "Name", "Description", "Image", "Latitude", "Longitude", "TourId", "Secret", "PositionInTour", "PublicPointId", "Discriminator", "Status", "CreatorId")
	VALUES (-19, 'Sculpture Garden Oasis', 'Enter the Sculpture Garden Oasis, a serene space where sculptures and installations harmonize with nature. This outdoor gallery provides a tranquil setting to appreciate three-dimensional art in a curated, natural environment.', 'https://s3.envato.com/files/462533057/IMG_4570-Edit.jpeg', 45.23700325991871, 19.83993530273438, -6, 'Some of the sculptures in the garden are interactive and change appearance based on the time of day, weather conditions, or the movements of ', 1, null, 'TourKeyPoint', null, null);

INSERT INTO tours."Tour"(
	"Id", "Name", "Description", "Difficulty", "Tags", "Status", "Price", "AuthorId", "Equipment", "DistanceInKm", "ArchivedDate", "PublishedDate", "Durations", "Image") VALUES
  (-10, 'Ledinacko jezero tour', 'Discover the serene beauty of Ledinacko Jezero, nestled in the picturesque Fruska Gora National Park. This enchanting tour promises a perfect blend of nature, tranquility, and cultural exploration.', 2, '{"bike", "hike"}', 1, 40, -3, '{}', 10.0, NULL, '2023-11-16 18:33:42.718996+01', '[{"TimeInSeconds": 4800, "Transportation": 1}]', 'https://cdn.discordapp.com/attachments/1165673303898345664/1197250587100717146/IMG_8660.jpg?ex=65ba957f&is=65a8207f&hm=2777393ea8d5587ddc6c3eba6b9f67be4986f0e6c87b8fd823a618a9f8b4e69a&');

INSERT INTO tours."Tour"(
	"Id", "Name", "Description", "Difficulty", "Tags", "Status", "Price", "AuthorId", "Equipment", "DistanceInKm", "ArchivedDate", "PublishedDate", "Durations", "Image") VALUES
  (-11, 'Light walk on Popovica', 'Take a leisurely light walk from Cafe Gorski Smesko to Orlovo Bojiste on Popovica mountain. Enjoy scenic trails, lush landscapes, and panoramic views. Revel in the tranquility, capturing the beauty of the surroundings. Conclude your walk with a peaceful return to Cafe Gorski Smesko, savoring the mountain atmosphere.', 0, '{"forest", "hike", "bike"}', 1, 20, -5, '{}', 5.0, NULL, '2023-11-16 18:33:42.718996+01', '[{"TimeInSeconds": 4800, "Transportation": 1}]','https://media.discordapp.net/attachments/1165673303898345664/1197251414750134352/DSC_3797.jpg?ex=65ba9645&is=65a82145&hm=82b4e84459710652f7bcd3a452384b65edd37dac9021c78e4c6c9ec9449bcc61&=&format=webp&width=984&height=655');

INSERT INTO tours."Tour"(
	"Id", "Name", "Description", "Difficulty", "Tags", "Status", "Price", "AuthorId", "Equipment", "DistanceInKm", "ArchivedDate", "PublishedDate", "Durations", "Image") VALUES
  (-12, 'Waterfall tour on Fruska', 'Embark on a picturesque walk from Beocin Monastery to Dumbovacki Vodopad in the heart of Fruska Gora. Meander through serene trails surrounded by lush greenery, absorbing the tranquility of the national park. As you approach Dumbovacki Vodopad, the sound of cascading water will guide you to this charming waterfall. Take in the natural beauty, capturing moments of serenity. After your exploration, enjoy a peaceful return to Beocin Monastery, enriched by the beauty of Fruska Gora landscapes.', 1, '{"adventure", "forest", "hike"}', 1, 70, -3, '{}', 22.0, NULL, '2023-11-16 18:33:42.718996+01', '[{"TimeInSeconds": 4800, "Transportation": 1}]','https://images-ext-2.discordapp.net/external/PCQnEM8R0R8CZIrc7IjXk6UK-KmNdfCDsjhmpMYTwq8/https/andrijanacojic.com/wp-content/uploads/2021/05/IMG_7377-scaled.jpg?format=webp&width=874&height=655');

INSERT INTO tours."Tour"(
	"Id", "Name", "Description", "Difficulty", "Tags", "Status", "Price", "AuthorId", "Equipment", "DistanceInKm", "ArchivedDate", "PublishedDate", "Durations", "Image") VALUES
  (-13, 'Tour of Strazilovo', '
Embark on a poignant journey from Strazilovo to the grave of Branko Radicevic, a renowned Serbian poet. The tour leads you through the serene landscapes, allowing moments of reflection on Radicevic literary contributions. As you reach the poet final resting place, absorb the cultural significance and pay homage to his legacy. The tour seamlessly blends nature and history, offering a profound connection to the poetic spirit of Strazilovo and the enduring influence of Branko Radicevic.', 2, '{"culture", "adventure", "monuments"}', 1, 50, -5, '{}', 25.0, NULL, '2023-11-16 18:33:42.718996+01', '[{"TimeInSeconds": 4800, "Transportation": 1}]','https://images-ext-1.discordapp.net/external/pBdA3RGS0EFXvK0KLxJolvpOAw8l8G3DzKet1PIdD6E/https/karlovci.org.rs/wp-content/uploads/2022/05/strazilovo-2.jpg?format=webp&width=1021&height=655');

INSERT INTO tours."Tour"(
	"Id", "Name", "Description", "Difficulty", "Tags", "Status", "Price", "AuthorId", "Equipment", "DistanceInKm", "ArchivedDate", "PublishedDate", "Durations", "Image") VALUES
  (-14, 'Explore beauty of Vrdnik monastery', 'Discover the cultural and spiritual richness of Vrdnik Monastery with a captivating tour. Nestled in a serene setting, this historic monastery welcomes you with its centuries-old architecture and tranquil ambiance. Explore the sacred halls adorned with religious art and immerse yourself in the monastery spiritual atmosphere. As you stroll through the peaceful grounds, soak in the history and cultural significance that Vrdnik Monastery offers. A visit here promises a harmonious blend of heritage, architecture, and a tranquil retreat into the spiritual past.', 2, '{"culture", "walk", "forest"}', 1, 55, -4, '{}', 15.0, NULL, '2023-11-16 18:33:42.718996+01', '[{"TimeInSeconds": 4800, "Transportation": 1}]','https://images-ext-1.discordapp.net/external/qhkSnV3kV8wOvuee9jf01EVHhAMHpb2RhQP4icKycGM/https/live.staticflickr.com/7040/27545703230_b91ca80114_b.jpg?format=webp&width=1033&height=655');





INSERT INTO tours."TourKeyPoints"(
	"Id", "Name", "Description", "Image", "Latitude", "Longitude", "TourId", "Secret", "PositionInTour", "PublicPointId", "Discriminator", "Status", "CreatorId")
	VALUES
     (-30, 'Ledinci', 'Old town Ledinci in beautiful forest of Fruska Gora', 'https://www.dnevnik.rs/sites/default/files/2021-08/15-1panorama%20ledinci%20mesna%20zajednica.jpg', 45.184834, 19.804383, -10, ' ', 0, null, 'TourKeyPoint', null, null),
     (-31, 'Ledinacko jezero', 'Old town Ledinci in beautiful forest of Fruska Gora', 'https://static.mondo.rs/Picture/1174346/jpeg/Ledinacko-jezero-6-.jpg?ts=2022-08-05T08:16:02',  45.165829, 19.805942, -10, ' ', 1, null, 'TourKeyPoint', null, null),
     (-32, 'Kraljeva stolica', 'Old town Ledinci in beautiful forest of Fruska Gora', 'https://planine.net/wp-content/uploads/2020/05/IMG_20200523_111201-1024x768.jpg',  45.157033, 19.810422, -10, ' ', 2, null, 'TourKeyPoint', null, null),
     (-33, 'Planinarski dom Iriski venac', 'Old town Ledinci in beautiful forest of Fruska Gora', 'https://upload.wikimedia.org/wikipedia/commons/4/41/Iri%C5%A1ki_venac%2C_Planinarski_dom_Vojvodina_002.jpg',  45.150496, 19.836962, -10, ' ', 3, null, 'TourKeyPoint', null, null);

INSERT INTO tours."TourKeyPoints"(
	"Id", "Name", "Description", "Image", "Latitude", "Longitude", "TourId", "Secret", "PositionInTour", "PublicPointId", "Discriminator", "Status", "CreatorId")
	VALUES
     (-34, 'Gorski smesko', 'Old town Ledinci in beautiful forest of Fruska Gora', 'https://luftika.rs/media/2022/06/gorski-smesko-6.jpg', 45.183885, 19.822954, -11, ' ', 0, null, 'TourKeyPoint', null, null),
     (-35, 'Orlovo bojiste', 'Old town Ledinci in beautiful forest of Fruska Gora', 'https://www.mojnovisad.com/files/news/8/6/1/5861/5861-0-orlovo-bojiste5.jpg',  45.180546, 19.830671, -11, ' ', 1, null, 'TourKeyPoint', null, null);

INSERT INTO tours."TourKeyPoints"(
	"Id", "Name", "Description", "Image", "Latitude", "Longitude", "TourId", "Secret", "PositionInTour", "PublicPointId", "Discriminator", "Status", "CreatorId")
	VALUES
     (-36, 'Beocin', 'Old town Ledinci in beautiful forest of Fruska Gora', 'https://luftika.rs/media/2021/07/lafarz-izvor-lafarge.rs_-e1625237928782.jpg', 45.205714, 19.721455, -12, ' ', 0, null, 'TourKeyPoint', null, null),
     (-37, 'Manastir Beocin', 'Old town Ledinci in beautiful forest of Fruska Gora', 'https://turizaminfo.com/wp-content/uploads/2020/12/beocin-2.jpg',  45.176438, 19.721971, -12, ' ', 1, null, 'TourKeyPoint', null, null),
     (-38, 'Dumbovacki vodopad', 'Old town Ledinci in beautiful forest of Fruska Gora', 'https://andrijanacojic.com/wp-content/uploads/2021/05/IMG_7377-scaled.jpg', 45.167307, 19.749811, -12, ' ', 2, null, 'TourKeyPoint', null, null),
     (-39, 'Planinarski dom Zmajevac', 'Old town Ledinci in beautiful forest of Fruska Gora', 'https://fastly.4sqi.net/img/general/600x600/462351721_xyUvWRCTBx3YwsYXFEaKCmNyH5gMpPI1umJ6VmJlM9o.jpg',  45.158855, 19.780774, -12, ' ', 3, null, 'TourKeyPoint', null, null);

INSERT INTO tours."TourKeyPoints"(
	"Id", "Name", "Description", "Image", "Latitude", "Longitude", "TourId", "Secret", "PositionInTour", "PublicPointId", "Discriminator", "Status", "CreatorId")
	VALUES
     (-40, 'Strazilovo', 'Old town Ledinci in beautiful forest of Fruska Gora', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Stra%C5%BEilovo.JPG/1200px-Stra%C5%BEilovo.JPG',45.169030, 19.917235, -13, ' ', 0, null, 'TourKeyPoint', null, null),
     (-41, 'Grob Branka Radicevica', 'Old town Ledinci in beautiful forest of Fruska Gora', 'https://www.dnevnik.rs/sites/default/files/2017-08/spomenik%20b%20radicevic.jpg',  45.166700, 19.913735, -13, ' ', 1, null, 'TourKeyPoint', null, null),
     (-42, 'Planinarski dom Strazilovo', 'Old town Ledinci in beautiful forest of Fruska Gora', 'https://fruskac.net/sites/default/files/styles/locations/public/gallery/tourism/planinarski-dom-strazilovo-1.jpg?itok=Uf0kC7hm', 45.172525, 19.912712, -13, ' ', 2, null, 'TourKeyPoint', null, null);

INSERT INTO tours."TourKeyPoints"(
	"Id", "Name", "Description", "Image", "Latitude", "Longitude", "TourId", "Secret", "PositionInTour", "PublicPointId", "Discriminator", "Status", "CreatorId")
	VALUES
     (-43, 'Planinarski dom Zmajevac', 'Old town Ledinci in beautiful forest of Fruska Gora', 'https://fastly.4sqi.net/img/general/600x600/462351721_xyUvWRCTBx3YwsYXFEaKCmNyH5gMpPI1umJ6VmJlM9o.jpg',45.157941,19.780674, -14, ' ', 0, null, 'TourKeyPoint', null, null),
     (-44, 'Manastir Vrdnik', 'Old town Ledinci in beautiful forest of Fruska Gora', 'https://upload.wikimedia.org/wikipedia/commons/f/f9/2006_Vrdnik_010.jpg',   45.128367, 19.784399, -14, ' ', 1, null, 'TourKeyPoint', null, null);

INSERT INTO tours."Sessions"(
	"Id", "TourId", "TouristId", "LocationId", "SessionStatus", "Transportation", "DistanceCrossedPercent", "LastActivity", "CompletedKeyPoints", "Version")
	VALUES (-1, -5, -6, -5, 1, 0, 102, '2024-01-17 19:03:43.891+01', '[
  {
    "KeyPointId": -14,
    "CompletionTime": "2024-01-17T18:03:44.0236251Z"
  },
  {
    "KeyPointId": -15,
    "CompletionTime": "2024-01-17T18:03:48.3290242Z"
  },
  {
    "KeyPointId": -16,
    "CompletionTime": "2024-01-17T18:04:00.6674661Z"
  }
]', 0);

INSERT INTO tours."Sessions"(
	"Id", "TourId", "TouristId", "LocationId", "SessionStatus", "Transportation", "DistanceCrossedPercent", "LastActivity", "CompletedKeyPoints", "Version")
	VALUES (-2, -6, -6, -5, 2, 2, 96, '2024-01-17 14:23:04.876+01', '[
  {
    "KeyPointId": -17,
    "CompletionTime": "2024-01-17T13:23:05.0353715Z"
  }
]', 0);

INSERT INTO tours."Sessions"(
	"Id", "TourId", "TouristId", "LocationId", "SessionStatus", "Transportation", "DistanceCrossedPercent", "LastActivity", "CompletedKeyPoints", "Version")
	VALUES (-3, -5, -7, -1, 2, 0, 0, '2024-01-17 19:25:17.151+01', '[
  {
    "KeyPointId": -14,
    "CompletionTime": "2024-01-17T18:25:17.1857651Z"
  }
]', 0);

INSERT INTO tours."Sessions"(
	"Id", "TourId", "TouristId", "LocationId", "SessionStatus", "Transportation", "DistanceCrossedPercent", "LastActivity", "CompletedKeyPoints", "Version")
	VALUES (-4, -5, -7, -1, 1, 0, 101, '2024-01-17 19:25:48.165+01', '[
  {
    "KeyPointId": -14,
    "CompletionTime": "2024-01-17T18:25:48.1862512Z"
  },
  {
    "KeyPointId": -15,
    "CompletionTime": "2024-01-17T18:25:53.14517Z"
  },
  {
    "KeyPointId": -16,
    "CompletionTime": "2024-01-17T18:26:01.6114309Z"
  }
]', 0);

INSERT INTO tours."Sessions"(
	"Id", "TourId", "TouristId", "LocationId", "SessionStatus", "Transportation", "DistanceCrossedPercent", "LastActivity", "CompletedKeyPoints", "Version")
	VALUES (-5, -1, -7, -1, 2, 0, 28, '2024-01-17 19:32:35.9+01', '[
  {
    "KeyPointId": -1,
    "CompletionTime": "2024-01-17T18:32:35.9454988Z"
  },
  {
    "KeyPointId": -2,
    "CompletionTime": "2024-01-17T18:32:47.1198623Z"
  }
]', 0);

INSERT INTO tours."Sessions"(
	"Id", "TourId", "TouristId", "LocationId", "SessionStatus", "Transportation", "DistanceCrossedPercent", "LastActivity", "CompletedKeyPoints", "Version")
	VALUES (-6, -3, -8, -2, 2, 1, 88, '2024-01-17 19:41:37.167+01', '[
  {
    "KeyPointId": -8,
    "CompletionTime": "2024-01-17T18:41:37.1970368Z"
  },
  {
    "KeyPointId": -9,
    "CompletionTime": "2024-01-17T18:41:47.8990699Z"
  },
  {
    "KeyPointId": -10,
    "CompletionTime": "2024-01-17T18:41:52.671981Z"
  }
]', 0);

INSERT INTO tours."Sessions"(
	"Id", "TourId", "TouristId", "LocationId", "SessionStatus", "Transportation", "DistanceCrossedPercent", "LastActivity", "CompletedKeyPoints", "Version")
	VALUES (-7, -4, -8, -2, 1, 0, 57, '2024-01-17 19:46:04.2+01', '[
  {
    "KeyPointId": -12,
    "CompletionTime": "2024-01-17T18:46:04.2228241Z"
  },
  {
    "KeyPointId": -13,
    "CompletionTime": "2024-01-17T18:46:07.6963036Z"
  }
]', 0);

INSERT INTO tours."Sessions"(
	"Id", "TourId", "TouristId", "LocationId", "SessionStatus", "Transportation", "DistanceCrossedPercent", "LastActivity", "CompletedKeyPoints", "Version")
	VALUES (-8, -5, -9, -3, 1, 0, 100, '2024-01-17 19:49:01.198+01', '[
  {
    "KeyPointId": -14,
    "CompletionTime": "2024-01-17T18:49:01.22481Z"
  },
  {
    "KeyPointId": -15,
    "CompletionTime": "2024-01-17T18:49:03.7244447Z"
  },
  {
    "KeyPointId": -16,
    "CompletionTime": "2024-01-17T18:49:13.7181131Z"
  }
]', 0);

INSERT INTO tours."Sessions"(
	"Id", "TourId", "TouristId", "LocationId", "SessionStatus", "Transportation", "DistanceCrossedPercent", "LastActivity", "CompletedKeyPoints", "Version")
	VALUES (-9, -3, -10, -4, 2, 1, 88, '2024-01-17 19:54:30.012+01', '[
  {
    "KeyPointId": -8,
    "CompletionTime": "2024-01-17T18:54:30.0542654Z"
  },
  {
    "KeyPointId": -9,
    "CompletionTime": "2024-01-17T18:54:37.0640236Z"
  },
  {
    "KeyPointId": -10,
    "CompletionTime": "2024-01-17T18:54:46.2983258Z"
  }
]', 0);

INSERT INTO tours."Sessions"(
	"Id", "TourId", "TouristId", "LocationId", "SessionStatus", "Transportation", "DistanceCrossedPercent", "LastActivity", "CompletedKeyPoints", "Version")
	VALUES (-10, -6, -10, -4, 1, 2, 95, '2024-01-17 19:57:48.674+01', '[
  {
    "KeyPointId": -17,
    "CompletionTime": "2024-01-17T18:57:48.7079422Z"
  },
  {
    "KeyPointId": -19,
    "CompletionTime": "2024-01-17T18:57:55.2852271Z"
  }
]', 0);

INSERT INTO tours."Sessions"(
	"Id", "TourId", "TouristId", "LocationId", "SessionStatus", "Transportation", "DistanceCrossedPercent", "LastActivity", "CompletedKeyPoints", "Version")
	VALUES (-11, -3, -10, -4, 2, 1, 61, '2024-01-17 20:01:32.351+01', '[
  {
    "KeyPointId": -8,
    "CompletionTime": "2024-01-17T19:01:32.4069372Z"
  },
  {
    "KeyPointId": -9,
    "CompletionTime": "2024-01-17T19:01:35.5172181Z"
  }
]', 0);

INSERT INTO payments."BoughtItems"(
    "Id", "UserId", "TourId", "DateOfBuying", "IsUsed")
VALUES 
    (-1, -7, -1, '2024-01-16 15:16:21.042606+01', false),
    (-2, -7, -5, '2024-01-17 15:59:28.827602+01', false),
    (-3, -7, -6, '2024-01-17 15:59:28.923959+01', false),
    (-4, -8, -2, '2024-01-17 16:05:46.705215+01', false),
    (-5, -8, -3, '2024-01-17 16:05:46.713431+01', false),
    (-6, -8, -4, '2024-01-17 16:05:46.720698+01', false),
    (-7, -9, -4, '2024-01-17 16:06:27.381924+01', false),
    (-8, -9, -5, '2024-01-17 16:06:27.390956+01', false),
    (-9, -9, -6, '2024-01-17 16:06:27.399863+01', false),
    (-10, -10, -3, '2024-01-17 16:07:06.430064+01', false),
    (-11, -10, -6, '2024-01-17 16:07:06.439224+01', false);



INSERT INTO encounters."Challenges"(
    "Id", "CreatorId", "Description", "Name", "Status", "Type", "Latitude", "Longitude", "ExperiencePoints", "KeyPointId", "Image", "LatitudeImage", "LongitudeImage", "Range", "RequiredAttendance")
VALUES (-1, -3, 'Enjoy the Challenge by calling as many people as possible to join.', 'Community Connection Rally', 1, 0, 45.249055, 19.850548, 190, null, null, null, null, 50, 2),
    (-2, -4, 'To complete this challenge, you need to find the designated picture and be at that location for 30 seconds.', 'Visual Quest Adventure', 1, 1, 45.252909, 19.855888, 30, null, 'https://fajlovi.bos4.tours/uploads/2020/10/images/tour_217/Petrovaradinska%20tvrdjava%20sat.jpg', 45.253355, 19.861284, 50, null),
    (-3, -3, 'To complete the challenge, you need to shout out loud.', 'Challenge 3', 1, 2, 45.255387, 19.845547, 20, null, null, null, null, 50, null),
    (-4, -3, 'You need to do 10 push-ups to complete the challenge.', 'Challenge 4', 1, 2, 45.244873, 19.841853, 10, null, null, null, null, 50, null),
    (-5, -4, 'Gathering Waves Challenge', 'Snapshot Scavenger Hunt', 1, 1, 45.249647, 19.825326, 10, null, 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Serbia-0268_-_Name_of_Mary_Parish_Church_(7344449164).jpg', 45.255128, 19.845097, 50, null),
    (-6, -5, 'To complete this challenge, you need to find the designated picture and be at that location for 30 seconds.', 'Gathering Waves Challenge', 1, 0, 45.264473, 19.825806, 10, null, null, null, null, 50, 2),
	(-7, -1, 'To complete this challenge, do a backflip.', 'Challenge for acrobat', 1, 2, 45.25190843660657, 19.83714580535889, 100, NULL, NULL, NULL, NULL, 50, NULL),
    (-8, -1, 'To complete this challenge, you need to find the designated picture and be at that location for 30 seconds.',  'Find a new means of transportation.', 1, 1, 45.256048215418566, 19.833498001098633, 50, NULL, 'https://novisad.travel/wp-content/uploads/2022/03/Brzi-voz-Novi-Sad_ACA_0103-scaled.jpg', 45.26538136482243, 19.829292297363285, 30, NULL),
     (-9, -2, 'Ubedi publiku da ti da lep aplauz ', 'Demo izazov', 1, 2, 45.247477347792135, 19.853885173788512, 50, null, null, null, null, 50, null);
INSERT INTO payments."BoughtItems"(
	"Id", "UserId", "TourId", "DateOfBuying", "IsUsed")
	VALUES 
    (-12, -6, -6, '2024-01-17 14:22:36.635888+01', false),
    (-13, -6, -5, '2024-01-17 14:22:36.646599+01', false),
    (-14, -6, -4, '2024-01-17 14:22:36.648848+01', false),
    (-15, -6, -3, '2024-01-17 14:22:36.651226+01', false);

INSERT INTO payments."Bundles"(
	"Id", "Name", "Price", "AuthorId", "ToursId", "BundleState")
	VALUES (-1,'Novi Sad Explorer Bundle', 250, -3, '{-1,-3}', 1);
	
INSERT INTO payments."Bundles"(
	"Id", "Name", "Price", "AuthorId", "ToursId", "BundleState")
	VALUES (-2,'Aritistic Voyage Bundle', 200, -4, '{-5,-6}', 1);

INSERT INTO tours."TourProblems"(
    "Id", "TouristId", "TourId", "Category", "Priority", "Description", "Time", "IsSolved", "Messages", "Deadline")
VALUES 
    (-1, -9, -6, 2, 1, 'The additional costs were charged and were not mentioned during the reservation.', '2024-01-17 20:00:00'::timestamp, false, '[]', null),
    (-2, -8, -4, 4, 1, 'The guide was late.', '2023-01-17 15:00:00'::timestamp, false, '[]', null);

INSERT INTO tours."TourRatings"(
	"Id", "PersonId", "TourId", "Mark", "Comment", "DateOfVisit", "DateOfCommenting", "Images")
	VALUES  (-1, -10, -6, 4, 'Absolutely amazing tour experience! The guides were knowledgeable, friendly, and made the entire journey enjoyable. The itinerary was well-planned, covering all the must-see attractions. The accommodations were top-notch, and the included meals were delicious. The group activities fostered a sense of camaraderie among fellow travelers. I highly recommend this tour for anyone seeking a memorable and immersive travel adventure. Cant wait to join another tour with this company in the future!', '2024-01-17 20:07:26.7+01', '2024-01-17 20:07:26.7+01', '{https://nypost.com/wp-content/uploads/sites/2/2017/12/nyc-streets.jpg?quality=75&strip=all}'),
			(-2, -10, -3, 5, 'Embarking on the ''Walk in Wild'' tour was an unforgettable adventure through nature''s wonders. The guides were not just experts but true enthusiasts, sharing their passion for the wilderness at every step. From scenic trails to hidden gems, each day offered a new discovery. The wildlife encounters were breathtaking, making this journey a perfect blend of excitement and serenity. The camp accommodations immersed us in the heart of nature without sacrificing comfort. If you''re seeking a transformative experience surrounded by the beauty of the wild, ''Walk in Wild'' is the tour for you. A truly remarkable and rejuvenating expedition!', '2024-01-17 20:08:21.375+01', '2024-01-17 20:08:21.375+01', '{https://cdn.britannica.com/87/138787-050-33727493/Belovezhskaya-Forest-Poland.jpg}'),
			(-3, -9, -5, 5, 'Embarking on the ''Food Route'' tour was a gastronomic delight from start to finish! Each stop along the way brought a new culinary adventure, tantalizing my taste buds with a diverse array of flavors and cuisines. The knowledgeable guides not only led us to hidden culinary gems but also shared fascinating insights into the local food culture. From street food markets to gourmet restaurants, every meal was a masterpiece. The carefully curated itinerary allowed us to savor both traditional and innovative dishes, creating a memorable journey for any food enthusiast. ''Food Route'' is a feast for the senses, offering a delectable exploration of the world''s culinary treasures.', '2024-01-17 20:12:32.323+01', '2024-01-17 20:12:32.323+01', '{https://cdnsecureimage.hotelkeys.it/202131511514647.jpeg}'),
			(-4, -8, -4, 3, 'The ''History Route'' tour was an enlightening adventure through time! Expert guides brought historical landmarks to life with fascinating narratives. From ancient tales to pivotal moments, this tour provided a captivating journey through the pages of history. A highly recommended experience for history buffs!', '2024-01-17 20:13:55.862+01', '2024-01-17 20:13:55.862+01', '{https://www.historic-uk.com/wp-content/uploads/2020/10/historic-uk-banner-scaled.jpg}'),
			(-5, -6, -6, 4, 'Exploring the art gallery was a sensory feast! Each masterpiece whispered its own story, and the curated collection showcased a mesmerizing blend of creativity. The atmosphere was serene, allowing for a profound connection with the art. Kudos to the knowledgeable staff who added insightful commentary. A cultural gem worth revisiting!', '2024-01-17 23:10:48.89+01', '2024-01-17 23:10:48.89+01', '{https://artgallery.yale.edu/sites/default/files/styles/hero_small/public/2023-01/ag-doc-2281-0036-pub.jpg?h=147a4df9&itok=uclO7OrF}'),
			(-6, -6, -5, 2, 'I must express my disappointment with the tour. The itinerary lacked variety, and the guide seemed disinterested. Some promised attractions were skipped, leaving us unsatisfied. Overall, it fell short of expectations, and I wouldnt recommend it to others seeking an engaging experience.', '2024-01-17 23:12:11.969+01', '2024-01-17 23:12:11.969+01', '{https://cdn.getyourguide.com/img/tour/621a3d641a639.jpeg/146.jpg}'),
			(-7, -7, -5, 4, 'I had an amazing experience on the food tour! The diverse selection of delicious dishes showcased the citys culinary gems. Our guide was knowledgeable and passionate, adding a delightful touch to each stop. I highly recommend this tour to fellow food enthusiasts – a flavorful journey that exceeded my expectations!', '2024-01-17 23:13:39.352+01', '2024-01-17 23:13:39.352+01', '{https://www.greekality.com/wp-content/uploads/2023/03/Food-tours-in-Athens-e1678193769211.jpg}');


INSERT INTO payments."BoughtItems"("Id", "UserId", "TourId", "DateOfBuying", "IsUsed")
VALUES 
(-16, -6, -14, '2024-01-18 00:04:51.791701+01', false),
(-17, -6, -13, '2024-01-18 00:04:51.907971+01', false),
(-18, -9, -12, '2024-01-18 00:05:14.436241+01', false),
(-19, -9, -11, '2024-01-18 00:05:14.442778+01', false),
(-20, -8, -10, '2024-01-18 00:05:46.284377+01', false),
(-21, -10, -11, '2024-01-18 00:06:16.697071+01', false),
(-22, -10, -12, '2024-01-18 00:06:16.703341+01', false),
(-23, -6, -11, '2024-01-18 00:17:56.02642+01', false),
(-24, -6, -10, '2024-01-18 00:17:56.034445+01', false);


INSERT INTO tours."Sessions"(
  "Id", "TourId", "TouristId", "LocationId", "SessionStatus", 
  "Transportation", "DistanceCrossedPercent", "LastActivity", 
  "CompletedKeyPoints", "Version"
)
VALUES 
  (-12, -11, -9, -3, 2, 1, 0, '2024-01-18 00:14:16.042+01', 
  '[{"KeyPointId": -34, "CompletionTime": "2024-01-17T23:14:16.0897291Z"}]', 0),
  
  (-13, -11, -10, -4, 2, 1, 0,'2024-01-18 00:13:02.374+01', 
  '[{"KeyPointId": -34, "CompletionTime": "2024-01-17T23:13:02.4222454Z"}]', 0),
  
  (-14, -10, -6, -5, 1, 1, 67, '2024-01-18 00:18:30.016+01', 
  '[{"KeyPointId": -30, "CompletionTime": "2024-01-17T23:18:30.0588124Z"}, {"KeyPointId": -31, "CompletionTime": "2024-01-17T23:18:33.6210081Z"}, {"KeyPointId": -32, "CompletionTime": "2024-01-17T23:18:38.4003235Z"}, {"KeyPointId": -33, "CompletionTime": "2024-01-17T23:18:44.6117019Z"}]', 0),
  
  (-15, -13, -6, -5, 1, 1, 9, '2024-01-18 00:11:27.466+01', 
  '[{"KeyPointId": -40, "CompletionTime": "2024-01-17T23:11:27.5178726Z"}, {"KeyPointId": -41, "CompletionTime": "2024-01-17T23:11:32.2172086Z"}, {"KeyPointId": -42, "CompletionTime": "2024-01-17T23:11:38.2183785Z"}]', 0),
  
  (-16, -11, -10, -4, 2, 1, 0, '2024-01-18 00:13:09.866+01', 
  '[{"KeyPointId": -34, "CompletionTime": "2024-01-17T23:13:09.9106961Z"}]', 0),
  
  (-17, -12, -10, -4, 1, 1, 49, '2024-01-18 00:09:30.081+01', 
  '[{"KeyPointId": -36, "CompletionTime": "2024-01-17T23:09:30.4713441Z"}, {"KeyPointId": -37, "CompletionTime": "2024-01-17T23:09:36.034688Z"}, {"KeyPointId": -38, "CompletionTime": "2024-01-17T23:09:49.1088273Z"}, {"KeyPointId": -39, "CompletionTime": "2024-01-17T23:09:56.2476772Z"}]', 0),
  
  (-18, -11, -10, -4, 1, 1, 0, '2024-01-18 00:21:30.802+01', 
  '[{"KeyPointId": -34, "CompletionTime": "2024-01-17T23:21:30.8426821Z"}, {"KeyPointId": -35, "CompletionTime": "2024-01-17T23:21:34.1911099Z"}]', 0),
  
  (-19, -10, -8, -2, 1, 1, 67, '2024-01-18 00:20:13.625+01', 
  '[{"KeyPointId": -30, "CompletionTime": "2024-01-17T23:20:13.6796301Z"}, {"KeyPointId": -31, "CompletionTime": "2024-01-17T23:20:20.1858399Z"}, {"KeyPointId": -32, "CompletionTime": "2024-01-17T23:20:26.3856429Z"}, {"KeyPointId": -33, "CompletionTime": "2024-01-17T23:20:32.8155167Z"}]', 0),
  
  (-20, -11, -10, -4, 2, 1, 0,'2024-01-18 00:10:27.171+01', 
  '[{"KeyPointId": -34, "CompletionTime": "2024-01-17T23:10:27.207126Z"}]', 0);


INSERT INTO tours."TourKeyPoints"(
	"Id", "Name", "Description", "Image", "Latitude", "Longitude", "TourId", "Secret", "PositionInTour", "PublicPointId", "Discriminator", "Status", "CreatorId")
	VALUES
(-45, 'Prison Veternik', 'The District Prison Novi Sad is one of the largest prisons in Serbia, accommodating not only detainees under investigation in the Municipal and District Courts but also individuals serving short prison sentences. On average, the facility houses around 450 inmates, including both men and women.', 'https://ocdn.eu/images/pulscms/NDk7MDA_/2b5a5e05a4e9cb5967c3a6a61ed1018e.jpg', 45.303545, 19.817226, NULL, 'Enjoy your imprisonment.', NULL,  NULL, 'PublicTourKeyPoints', 0, -4),
(-46, 'Big Centar', 'At the BIG shopping center in Novi Sad, you can expect fantastic shopping, excellent gastronomic offerings, as well as entertainment and relaxation facilities. Visit us and discover a new shopping experience!', 'https://www.big-cee.com/wp-content/uploads/2022/10/BIG_NOVI-SAD_1-1-1.png.webp', 45.275805, 19.827572, NULL, 'Enjoy your shopping.', NULL, NULL, 'PublicTourKeyPoints', 0, -4);


INSERT INTO tours."Sessions"(
    "Id", "TourId", "TouristId", "LocationId", "SessionStatus",
    "Transportation", "DistanceCrossedPercent", "LastActivity",
    "CompletedKeyPoints", "Version")
VALUES (
    -21, -12, -9, -3, 1, 1, 49,
    '2024-01-18 08:18:29.863+01',
    '[{"KeyPointId": -36, "CompletionTime": "2024-01-18T07:18:29.8970381Z"}, {"KeyPointId": -37, "CompletionTime": "2024-01-18T07:18:34.0981066Z"}, {"KeyPointId": -38, "CompletionTime": "2024-01-18T07:18:40.6919854Z"}, {"KeyPointId": -39, "CompletionTime": "2024-01-18T07:18:46.9705048Z"}]', 0
);

INSERT INTO tours."Sessions"(
    "Id", "TourId", "TouristId", "LocationId", "SessionStatus",
    "Transportation", "DistanceCrossedPercent", "LastActivity",
    "CompletedKeyPoints", "Version")
VALUES (
    -22, -12, -10, -4, 1, 1, 49,
    '2024-01-18 08:20:42.179+01',
    '[{"KeyPointId": -36, "CompletionTime": "2024-01-18T07:20:42.2116596Z"}, {"KeyPointId": -37, "CompletionTime": "2024-01-18T07:20:45.5753277Z"}, {"KeyPointId": -38, "CompletionTime": "2024-01-18T07:20:49.4968582Z"}, {"KeyPointId": -39, "CompletionTime": "2024-01-18T07:20:53.9203913Z"}]', 0
);

INSERT INTO tours."Sessions"(
    "Id", "TourId", "TouristId", "LocationId", "SessionStatus",
    "Transportation", "DistanceCrossedPercent", "LastActivity",
    "CompletedKeyPoints", "Version")
VALUES (
    -23, -12, -10, -4, 1, 1, 49,
    '2024-01-18 08:21:07.161+01',
    '[{"KeyPointId": -36, "CompletionTime": "2024-01-18T07:21:07.2021906Z"}, {"KeyPointId": -37, "CompletionTime": "2024-01-18T07:21:11.0784902Z"}, {"KeyPointId": -38, "CompletionTime": "2024-01-18T07:21:15.7382972Z"}, {"KeyPointId": -39, "CompletionTime": "2024-01-18T07:21:22.7031225Z"}]', 0
);

INSERT INTO tours."Sessions"(
    "Id", "TourId", "TouristId", "LocationId", "SessionStatus",
    "Transportation", "DistanceCrossedPercent", "LastActivity",
    "CompletedKeyPoints", "Version")
VALUES (
    -24, -2, -8, -2, 2, 0, 47,
    '2024-01-18 08:37:54.553+01',
    '[{"KeyPointId": -4, "CompletionTime": "2024-01-18T07:37:54.7662099Z"}, {"KeyPointId": -5, "CompletionTime": "2024-01-18T07:37:58.3507836Z"}]', 0
);

INSERT INTO tours."Sessions"(
    "Id", "TourId", "TouristId", "LocationId", "SessionStatus",
    "Transportation", "DistanceCrossedPercent", "LastActivity",
    "CompletedKeyPoints", "Version")
VALUES (
    -25, -2, -8, -2, 2, 0, 75,
    '2024-01-18 08:38:56.065+01',
    '[{"KeyPointId": -4, "CompletionTime": "2024-01-18T07:38:56.1073954Z"}, {"KeyPointId": -5, "CompletionTime": "2024-01-18T07:39:00.7970785Z"}, {"KeyPointId": -6, "CompletionTime": "2024-01-18T07:39:04.2065632Z"}]', 0
);

INSERT INTO payments."BoughtItems"(
    "Id", "UserId", "TourId", "DateOfBuying", "IsUsed")
VALUES (
    -25, -10, -13, '2024-01-18 08:46:52.396351+01', false
);

INSERT INTO payments."BoughtItems"(
    "Id", "UserId", "TourId", "DateOfBuying", "IsUsed")
VALUES (
    -26, -9, -13, '2024-01-18 09:03:04.743076+01', false
);

INSERT INTO tours."Sessions"(
    "Id", "TourId", "TouristId", "LocationId", "SessionStatus",
    "Transportation", "DistanceCrossedPercent", "LastActivity",
    "CompletedKeyPoints", "Version")
VALUES (
    -26, -13, -9, -3, 2, 1, 5,
    '2024-01-18 09:05:59.538+01',
    '[{"KeyPointId": -40, "CompletionTime": "2024-01-18T08:05:59.6944858Z"}, {"KeyPointId": -41, "CompletionTime": "2024-01-18T08:06:05.4796957Z"}]', 0
);


INSERT INTO tours."Sessions"(
    "Id", "TourId", "TouristId", "LocationId", "SessionStatus", "Transportation", "DistanceCrossedPercent", "LastActivity", "CompletedKeyPoints", "Version")
VALUES 
    (-27, -13, -10, -4, 1, 1, 9, '2024-01-18 09:15:50.833+01', 
    '[{"KeyPointId": -40, "CompletionTime": "2024-01-18T08:15:51.3465413Z"},
      {"KeyPointId": -41, "CompletionTime": "2024-01-18T08:15:56.7426679Z"},
      {"KeyPointId": -42, "CompletionTime": "2024-01-18T08:16:21.3973183Z"}]', 0),
    (-28, -4, -9, -3, 1, 0, 57,  '2024-01-18 09:27:31.175+01', 
    '[{"KeyPointId": -12, "CompletionTime": "2024-01-18T08:27:31.2248803Z"},
      {"KeyPointId": -13, "CompletionTime": "2024-01-18T08:27:43.1287138Z"}]', 0);

INSERT INTO tours."TourRatings"(
    "Id", "PersonId", "TourId", "Mark", "Comment", "DateOfVisit", "DateOfCommenting", "Images")
VALUES 
    (-8, -10, -12, 5, 'This was really magical tour, I enjoyed every moment of it!!! <3', 
    '2024-01-18 09:21:42.26+01', '2024-01-18 09:21:42.26+01', 
    '{"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5afZTp10UvqHEevWXLO4qEb5qH6laB9lp7YoMD0IdFJCxTcGOjYalv1mUbTHr96-C9zg&usqp=CAU"}'),
    
    (-9, -9, -12, 5, 'It was great hiking with these people on these beautiful paths!', 
    '2024-01-18 09:26:58.332+01',  '2024-01-18 09:26:58.332+01', 
    '{"https://cdn.discordapp.com/attachments/1165673303898345664/1197456518749102110/20230410_150807.jpg?ex=65bb5549&is=65a8e049&hm=7226a837e7098bd43dad3dad8d6a9865b366eacfa9d196385049d28bb745c92e&"}'),

    (-10, -9, -4, 3, 'Meh, it was too ordinary for me', 
     '2024-01-18 09:28:47.695+01',  '2024-01-18 09:28:47.695+01', 
    '{"https://www.gradnja.rs/wp-content/uploads/2019/04/golubacka-tvdjava-06.jpg"}'),

    (-11, -8, -10, 5, 'It was really good weather that day, so the lake was in its full shine', 
     '2024-01-18 09:30:32.032+01', '2024-01-18 09:30:32.032+01', 
    '{"https://nova.rs/wp-content/uploads/2022/08/07/1659871432-1-1200x800.jpg"}'),

    (-12, -8, -2, 2, 'It was really bad tour, all streets were just crowded and we could not see anything', 
    '2024-01-18 09:33:15.666+01',  '2024-01-18 09:33:15.666+01', 
    '{"https://thehill.com/wp-content/uploads/sites/2/2023/06/648e08fa8f2698.92719294-e1687042741437.jpeg?strip=1"}'),

    (-13, -8, -3, 4, 'It was too hard for me, so I could not enjoy nature that much', 
    '2024-01-18 09:34:32.924+01', '2024-01-18 09:34:32.924+01', 
    '{"https://www.fao.org/images/newsroomlibraries/breafing-notes/36949400340_030e4ae5f9_oab4ccd35-fd6a-4230-bd2e-f0113f50357d.jpg?sfvrsn=426ca1c_3"}');

INSERT INTO tours."TourRatings"(
    "Id", "PersonId", "TourId", "Mark", "Comment", "DateOfVisit", "DateOfCommenting", "Images")
VALUES 
    (-14, -6, -10, 5, 'This hike was really hard for me, but in the end it was beautiful, the view was magical.', 
     '2024-01-18 09:47:29.993+01',  '2024-01-18 09:47:29.993+01', 
    '{"https://cdn.discordapp.com/attachments/1165673303898345664/1197457130228305981/IMG_6620.jpg?ex=65bb55db&is=65a8e0db&hm=8088ed25240c693b393c097dc10db68911a78fef5ceba3d2de3f56a9eb5cc18b&"}');

INSERT INTO payments."BoughtItems"(
    "Id", "UserId", "TourId", "DateOfBuying", "IsUsed")
VALUES (
    -27, -7, -12, '2024-01-18 09:58:57.541208+01', false
);

INSERT INTO payments."BoughtItems"(
    "Id", "UserId", "TourId", "DateOfBuying", "IsUsed")
VALUES (
    -28, -7, -10, '2024-01-18 09:58:57.639816+01', false
);

INSERT INTO tours."Sessions"(
    "Id", "TourId", "TouristId", "LocationId", "SessionStatus",
    "Transportation", "DistanceCrossedPercent", "LastActivity",
    "CompletedKeyPoints", "Version")
VALUES (
    -29, -10, -7, -1, 2, 1, 32,
    '2024-01-18 09:59:24.532+01',
    '[{"KeyPointId": -30, "CompletionTime": "2024-01-18T08:59:24.7950504Z"}, {"KeyPointId": -31, "CompletionTime": "2024-01-18T08:59:28.5772755Z"}]', 0
);


INSERT INTO tours."Sessions"(
    "Id", "TourId", "TouristId", "LocationId", "SessionStatus",
    "Transportation", "DistanceCrossedPercent", "LastActivity",
    "CompletedKeyPoints", "Version")
VALUES (
    -30, -12, -7, -1, 2, 1, 0,
    '2024-01-18 09:59:47.064+01',
    '[{"KeyPointId": -36, "CompletionTime": "2024-01-18T08:59:47.104412Z"}]', 0
);