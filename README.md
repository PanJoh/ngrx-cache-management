# ngrx-cache-management
A library that implements cache management based on Ngrx

## Description
Sometimes in an application you don't want to refetch data form some source,like a REST end point, if you have already fetched them, but there is the requirement
to not work with information fetched hours ago, or trigger a refetch on certain occasions 
One possibility would be to add caching information to the fetched data wherever they are stored, for example a ngrx entity store, and for each data entity of the
application implement the caching logic.
A better aproach which is the purpose of this libary is, to have a mechanism to augment the data through a unique id with caching informations, and have the
caching algorithm implemented in a service.

## Api

### CacheManagementService
It's purpose is do augment entities identified by uniqe ids with caching data an algorithms. It is doing so by organizing them in namspaces, within which a id 
has to be unique. The id for example can be the uniqe id used in ngrx entity stores.

#### Methods

*createNamespace(namespace: string, ttl: number): void*  
This method creates a new namspace identified by the **namespace** parameter. The **ttl** parameter defines the time in millisecond that must elapse since the
data where fetched last to become stale.

*get<T>(namespace: string, id: string, fetcher: (stale: boolean) => Observable<T>): Observable<T>*  
The purpose of this method is to include the cache management in data fetching operations.
If the resource identified by **namespace** and **id** becomes stale the **fetcher** is called with *stale* set to true and false oterwhise.
If the resource becomes stale, and the observable returned by the **fetcher** emits a value, the current time is used as the last fetch time of
the resoure. The observable that this method returns emits whatever the observable returned by **fetcher** emits.
