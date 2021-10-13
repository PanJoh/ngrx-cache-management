# ngrx-cache-management
A library that implements cache management based on Ngrx

##Description
Sometimes in an application you don't want to refetch data form some source,like a REST end point, if you have already fetched them, but there is the requirement
to not work with information fetched hours ago, or trigger a refetch on certain occasions 
One possibility would be to add caching information to the fetched data wherever they are stored, for example a ngrx entity store, and for each data entity of the
application implement the caching logic.
A better aproach which is the purpose of this libary is, to have a mechanism to augment the data through a unique id with caching informations, and have the
caching algorithm implemented in a service.

##Api
