# BLOG APPLICATION API PROJECT DOCUMENTATION
## Tech stack
__Server:__ Node, Express, MongoDB, Mongoose, JWT

# API FEATURES

- Authentication and Authorization
- Post CRUD Operations
- Comment Functionalities
- System block user if inactive for 30days
- Admin can also block user
- A user can block another user from his accessibility
- Last date a post was created
- Check if a user is active or not
- Check last date a user was active
- Changing user award base on the number of posts
- a user can follow and unfollow another user
- Get following and follower counts
- Get total viewer counts
- Get blocked counts
- Get all user who view someone's profile
- Admin can unblock a blocked user
- Update user password
- Profile photo upload
- A user can close his/her account


# ENDPOINTS

- [API AUTHENTICATION](#API-Authentication)
  - [Register a new API Client](##Register-a-new-API-Client)
  - [Login](#Users)

- [Users](#Users)
  - [Get my profile](##Register-a-new-API-Client)
  - [Get all users](##Register-a-new-API-Client)
  - [View a user profile count](##Register-a-new-API-Client)
  - [Following a user](##Register-a-new-API-Client)
  - [#Unfollowing a user](##Register-a-new-API-Client)
  - [Update a user password](##Register-a-new-API-Client)
  - [Update your profile](##Register-a-new-API-Client)
  - [Block another user](##Register-a-new-API-Client)
  - [Unblock another user](##Register-a-new-API-Client)
  - [Admin blocking a user](##Register-a-new-API-Client)
  - [Update a user password](##Register-a-new-API-Client)
  - [Delete your account](##Register-a-new-API-Client)
  - [Upload a profile photo](##Register-a-new-API-Client)
  
 - [Posts](#Post)
    - [Create Post](##Register-a-new-API-Client)
    - [Get all Posts](##Register-a-new-API-Client)
    - [Like Post](##Register-a-new-API-Client)
    - [Dislike Post](##Register-a-new-API-Client)
    - [Get viewers of post](##Register-a-new-API-Client)
    - [Update Post](##Register-a-new-API-Client)
    - [Delete Post](##Register-a-new-API-Client)
 
 - [Comments](#Comment)
    - [Create Comment](##Register-a-new-API-Client)
    - [Get all Comments](##Register-a-new-API-Client)
    - [Update Comment](##Register-a-new-API-Client)

 - [Categories](#Category)
    - [Create Category](##Register-a-new-API-Client)
    - [Get all Categoriess](##Register-a-new-API-Client)
    - [Get a single category](##Register-a-new-API-Client)
    - [Update Category](##Register-a-new-API-Client)
    - [Delete Category](##Register-a-new-API-Client)


# API Authentication
Some endpoints would require authentication to perform some actions. Example of that is when you need to create/update/delete post, you will need your access token to do that.
The endpoint that requires authentication requires a bearer token to be sent to the `Authorization Header`.
__Example__: 
`Authorization: Bearer Your Token`.

## Register an API Client
```http
POST /api/blog/v1/user/register
```

The request body needs to be a JSON Format

# Users
## Login

```http
POST /api/blog/v1/user/login
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `email`   |`string`| Your email | Yes|
|`password` | `string` | Your password | Yes|

## View User Profile

```http
GET /api/blog/v1/user/profile
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `email`   |`string`| Your email | No|
|`password` | `string` | Your password | No |


## Delete Your Account

```http
DELETE /api/blog/v1/user/deleteAccount
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `email`   |`string`| Your email | No|
|`password` | `string` | Your password | No|


## Update Your Profile

```http
PUT /api/blog/v1/user/update-profile
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `title`   |`string`| Your email | Yes|
|`description` | `string` | Your password | Yes|


## Update Your Password

```http
PUT /api/blog/v1/user/update-password
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
|`password` | `string` | Your password | Yes|


## View all Users Profile

```http
GET /api/blog/v1/user/all-users
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | no|
| `email`   |`string`| Your email | no|
|`password` | `string` | Your password | no|


## Follow User

```http
GET /api/blog/v1/user/following/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `id`   |`string`| user id | Yes|



## Unfollow User

```http
GET /api/blog/v1/user/unfollowing/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `id`   |`string`| user id | Yes|


## Block User

```http
GET /api/blog/v1/user/blocked/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `id`   |`string`| user id | Yes|


## Unblock User

```http
GET /api/blog/v1/user/unblocked/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `id`   |`string`| user id | Yes|


## Admin block User

```http
PUT /api/blog/v1/user/blockedByAdmin/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `email`   |`string`| Your email | Yes|
|`password` | `string` | Your password | Yes|


## Admin unblock a blocked User

```http
PUT /api/blog/v1/user/admin-unblock/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `id`   |`string`| user id | Yes|


## Upload Profile Photo

```http
POST /api/blog/v1/user/profile-upload
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `email`   |`string`| Your email | Yes|
|`password` | `string` | Your password | Yes|


# Post
## Create Post

```http
POST /api/blog/v1/post/
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `title`   |`string`| Your email | Yes|
|`description` | `string` | Your password | Yes|


## View All Posts

```http
POST /api/blog/v1/post/
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `title`   |`string`| Your email | no|
|`description` | `string` | Your password | no|

## Like a Post

```http
GET /api/blog/v1/post/likes/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `id`   |`string`| User id | Yes|


## Dislike a Post

```http
GET /api/blog/v1/post/dislikes/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `id`   |`string`| User id | Yes|


## View a Post

```http
GET /api/blog/v1/post/dislikes/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `id`   |`string`| Post id | Yes|

## Update Post

```http
GET /api/blog/v1/post/update/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `id`   |`string`| User id | Yes|


## Delete a Post

```http
DELETE /api/blog/v1/post/delete/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `id`   |`string`| Post id | Yes|

# Comment

## Create a comment

```http
POST /api/blog/v1/comment/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `id`   |`string`| Post id | Yes|


## Update comment

```http
PUT /api/blog/v1/comment/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `id`   |`string`| Post id | Yes|

## Delete comment

```http
DELETE /api/blog/v1/comment/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `id`   |`string`| Post id | Yes|

# Category
## Create Category

```http
POST /api/blog/v1/category/
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `title`   |`string`| Your email | Yes|
|`description` | `string` | Your password | Yes|

## View All Categories

```http
GET /api/blog/v1/category/
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `title`   |`string`| Your email | no|
|`description` | `string` | Your password | no|


## View a single category

```http
GET /api/blog/v1/category/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `id`   |`string`| category id | Yes|


## Update category

```http
PUT /api/blog/v1/category/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `id`   |`string`| category id | Yes|


## Delete category

```http
DELETE /api/blog/v1/category/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `id`   |`string`| category id | Yes|



