[![Xobpord](https://i.imgur.com/pho4qb5.png)](https://calla-mari.github.io/xobpord-client/)

# Xobpord

## Description

This application allows users to upload image files to a database where all users can upload, view and download all files in the database.  In addition, the owners of the files have the permision to edit and delete their own files.

## Technologies used

- HTML
- CSS
- Javascript
- Bootstrap
- git
- Amazon Web Services (AWS)
- Node
- Express
- Multer

## Next Version

- searchable keywords and tags
- collaboration/permission system so non owners can also edit files
- styling

## Planning

The process started with planning a user story and ERD, then the wireframe just fell into place.  The user authentication and file upload forms were created in parallel with the backend API while making sure that the relationship exists between the users and the database.  After all of that is set up, some time was allocated to styling the website.  Future versions will have searchable field for keyword and tag searches.  Lack of experience with AWS S3 and working with git as a team was a challenge in the beginning.

## User Story

[User Story](https://imgur.com/a/Gyd8TSZ)

## Questions for Client

[Questions](https://imgur.com/a/nCG8gNr)

## Wireframes

[Wireframes](https://imgur.com/a/GxXLGB3)

## Entity Relationship Diagram (ERD)

[ERD](https://imgur.com/a/0OeCHfI)

## Xobpord Client

[Client Website](https://calla-mari.github.io/xobpord-client/)

[Client Repository](https://github.com/calla-mari/xobpord-client)

## Xobpord Server

[Server Website](https://xobpord2.herokuapp.com/)

[Server Repository](https://github.com/calla-mari/xobpord-api)

## Routing
```js
router.get('/uploads', requireToken, (req, res) => {}

router.post('/uploads', [requireToken, upload.single('image')], (req, res) => {}

router.patch('/uploads/:id', requireToken, (req, res) => {}

router.delete('/uploads/:id', requireToken, (req, res) => {}
```
