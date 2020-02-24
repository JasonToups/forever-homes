# Forever Homes

## Overview
Adopt, don't shop! Of the nearly 8 million pet animals entered into animal shelters nationwide every year, almost 3 million are euthanized for not being adopted. 'Forever Homes' is a Django web application that allows users to view available adoption animals, favorite those that catch their eye, and link to the full adoption process for that animal if they choose to add that pet to their famiily. The name is taken from a common phrase in the adoption industry, as animals who are successfully adopted "find their forever home".

Vistors are able to see a default feed of adoptable pets when they arrive at the application homepage. However, in order to access the search and profile features, they need to register an acccount. The search feature is particular robust, with many animal types outside of the most common adoption animals (e.g. 'Scales, Fins & Others, Barnyard).

## Languages/Frameworks:

- Django
- Python

##### Application Dependencies
- asgiref
- psycopg2
- pytz
- sqlparse

#### Third-Party APIs
- PetFinder

## Existing Features

#### Pet Feed
The homepage of the application defaults to displaying available dogs for adoption. Pulled as objects from the Petfinder API JSON response, each post displays several points of information per animal. Cards are dynamic -- when clicked by the user, the text information portion of the post expands to include full details about the pet as well as a button that links to the third-party site where users can complete the process to fully adopt a pet.

#### User Registration & Profile 
In order to access the search feature, users must register and account and provide additional personal details to create a profile. The registration page was created using Django's in-built 'UserCreationForm', while the profile page was created using a hardcoded 'ProfileForm'.

#### Search
Users are able to use a dynamic set of search fields to find the perfect pet for their family! The initial search field is for animal type. Based on the user's choice of animal type, the remaining three search fields (coats, color, gender) are rendered after running an AJAX call to the PetFinder API to determine what properties each animal type has to be searched.

#### User Profile
In addition to registering an account, users are asked to create a Profile where they provide more persona details -- their first and last name and email. Additionally, for a pleasant user experience and additional security, the user can choose to update their password.

## Wireframes
![Image of Initial Wireframe]
(https://photos.app.goo.gl/Z467wQQHM6pFKg5d9)

## Moving Forward
