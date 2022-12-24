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
  - [Register a new API Client](https://www.github.com/octokatherine)
  - [Login](https://www.github.com/octokatherine)

- [Users](https://www.github.com/octokatherine)
  - [Get my profile](https://www.github.com/octokatherine)
  - [Get all users](https://www.github.com/octokatherine)
  - [View a user profile count](https://www.github.com/octokatherine)
  - [Following a user](https://www.github.com/octokatherine)
  - [#Unfollowing a user](https://www.github.com/octokatherine)
  - [Update a user password](https://www.github.com/octokatherine)
  - [Update your profile](https://www.github.com/octokatherine)
  - [Block another user](https://www.github.com/octokatherine)
  - [Unblock another user](https://www.github.com/octokatherine)
  - [Admin blocking a user](https://www.github.com/octokatherine)
  - [Update a user password](https://www.github.com/octokatherine)
  - [Delete your account](https://www.github.com/octokatherine)
  - [Upload a profile photo](https://www.github.com/octokatherine)


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

# API Reference
## User Login

```http
POST /api/blog/v1/user/login
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `email`   |`string`| Your email | Yes|
|`password` | `string` | Your password | Yes|

## View User Profile

```http
POST /api/blog/v1/user/profile
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `email`   |`string`| Your email | No|
|`password` | `string` | Your password | No |


## Delete Your Account

```http
POST /api/blog/v1/user/deleteAccount
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `email`   |`string`| Your email | No|
|`password` | `string` | Your password | No|


## Update Your Profile

```http
POST /api/blog/v1/user/update-profile
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `title`   |`string`| Your email | Yes|
|`description` | `string` | Your password | Yes|


## Update Your Password

```http
POST /api/blog/v1/user/profile
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
|`password` | `string` | Your password | Yes|


## View all Users Profile

```http
POST /api/blog/v1/user/all-users
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | no|
| `email`   |`string`| Your email | no|
|`password` | `string` | Your password | no|


## Follow User

```http
POST /api/blog/v1/user/following/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `email`   |`string`| Your email | Yes|
|`password` | `string` | Your password | Yes|


## Unfollow User

```http
POST /api/blog/v1/user/unfollowing/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `email`   |`string`| Your email | Yes|
|`password` | `string` | Your password | Yes


## Block User

```http
POST /api/blog/v1/user/blocked/:id
```
|Parameter |Type |Description |Required|
|:---------|:----|:-----------|:-------|
| `authentication`   |`string`| Your Token | Yes|
| `email`   |`string`| Your email | Yes|
|`password` | `string` | Your password | Yes


