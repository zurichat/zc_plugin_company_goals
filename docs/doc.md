# Goals Plugin API Documentation

## Description

```bash
title: Goal Plugin API
description: This list all the apis for goal plugin.
version: 0.0.1
```

## Base URL

```bash
url: https://goals.zuri.chat/api/v1
```

## Authorization

Take note, all api's endpoint in this plugin required you authenticated.

<!-- Sidebar Endpoint start from here -->

## Sidebar Endpoint

---

> ### Description

&nbsp; This endpoint return all the sidebar data for a paticular organization.

> ### Parameters

| Method | Endpoint   | Body | Parameter | Query | Content Type       | Description |
| ------ | ---------- | ---- | --------- | ----- | ------------------ | ----------- |
| `GET`  | `/sidebar` | null | null      | org   | `application/json` |             |

> ### Code Sample

```bash
curl -X 'GET' \
  'https://goals.zuri.chat/api/v1/sidebar?org=6145d099285e4a184020742e' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {KEY}' \
```

> ### Sample Response

&nbsp;&nbsp; **Code: 200**

```bash
{
  name: "Company Goals Plugin",
  description: "Shows company goals items",
  plugin_id: "613dcd7ae4010959c8dc0c56",
  organization_id: "6145d099285e4a184020742e",
  group_name: "Goals",
  show_group: false,
  joined_rooms: [
    {
      title: "All Goals",
      id: "6145d099285e4a184020742e",
      unread: 0,
      members: 100,
      icon: "cdn.cloudflare.com/445345453345/hello.jpeg",
      action: "open",
      url: "http://goals.zuri.chat/goals/rooms/6145d099285e4a184020742e"
    }
  ],
  public_rooms: []
}
```

&nbsp;&nbsp; **Code: 400**

```bash
{
  status: 'fail',
  message: 'organization id is required'
}
```

&nbsp;&nbsp; **Code: 401**

```bash
{
  status: 'fail',
  message: 'Unauthorized'
}
```

&nbsp;&nbsp; **Code: 404**

```bash
{
  status: 'fail',
  message: 'Can not find the requested url on this server'
}
```

&nbsp;&nbsp; **Code: 500**

```bash
{
  status: 'error',
  message: 'Internal server error'
}
```

<!-- Goals Endpoint start from here -->

## Goals Endpoint

---

<!-- Create goal endpoint -->

> ### Create Goal
>
> ### Description

&nbsp; This endpoint Create a brand new goal.

> ### Parameters

| Method | Endpoint | Body                                                                                                                                                        | Parameter | Query  | Content Type       | Description                                |
| ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------ | ------------------ | ------------------------------------------ |
| `POST` | `/goals` | `{"category": "#backend","description": "test goal","start_date": "2020-10-02","due_date": "2020-10-02","goal_type": "annual", "goal_name": "public room"}` | null      | org_id | `application/json` | All the field in the body are **required** |

> ### Code Sample

```bash
curl -X 'POST' \
  'https://goals.zuri.chat/api/v1/goals?org_id=6145d099285e4a184020742e' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "category": "#backend",
  "description": "test goal",
  "start_date": "2020-10-02",
  "due_date": "2020-10-02",
  "goal_type": "annual",
  "goal_name": "public room"
}'
```

> ### Sample Response

&nbsp;&nbsp; **Code: 200**

```bash
{
  message: "success",
  status: 200,
  data: {
    room_id: "8d9273ef-76c7-4a6d-a4b5-d8e4fad2e60f",
    isComplete: false,
    isExpired: false,
    category: "#backend",
    description: "test goal",
    start_date: "2020-10-02",
    due_date: "2020-10-02",
    goal_type: "annual",
    goal_name: "public room"
  }
}

```

&nbsp;&nbsp; **Code: 400**

```bash
{
  status: 'fail',
  message: 'Goal with the title: "public room" and  category: "#backend" already exists on your organization'
}
```

&nbsp;&nbsp; **Code: 401**

```bash
{
  status: 'fail',
  message: 'Unauthorized'
}
```

&nbsp;&nbsp; **Code: 404**

```bash
{
  status: 'fail',
  message: 'Can not find the requested url on this server'
}
```

&nbsp;&nbsp; **Code: 500**

```bash
{
  status: 'error',
  message: 'Internal server error'
}
```

<!-- Get all goals endpoint -->

> ### Get all goal
>
> ### Description

&nbsp; This endpoint get all the goals.

> ### Parameters

| Method | Endpoint | Body | Parameter | Query                                   | Content Type       | Description                                                                                                       |
| ------ | -------- | ---- | --------- | --------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/goals` | null | null      | **org_id** <br> **page** <br> **limit** | `application/json` | The only required field is **org_id**, **page** and **limit** fields are used to paginate all the goals returned. |

> ### Code Sample

```bash
curl -X 'POST' \
  'https://goals.zuri.chat/api/v1/goals?org_id=6145d099285e4a184020742e' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "category": "#backend",
  "description": "test goal",
  "start_date": "2020-10-02",
  "due_date": "2020-10-02",
  "goal_type": "annual",
  "goal_name": "public room"
}'
```

> ### Sample Response

&nbsp;&nbsp; **Code: 200**

```bash
{
  message: "success",
  status: 200,
  data: [
    {
      id: "613ddbd3e4010959c8dc0c5e",
      category: "#backend",
      createdBy: "Depeju",
      description: "test goal",
      start_date: "2020-10-02",
      due_date: "2020-10-02",
      goal_type: "annual",
      goal_name: "public room",
      isComplete: true,
      isExpired: true,
      room_id: "b66e5fe5-2c66-413c-b2fc-a38d6ab76330"
    }
  ]
}

```

&nbsp;&nbsp; **Code: 400**

```bash
{
  status: 'fail',
  message: 'Goal with the title: "public room" and  category: "#backend" already exists on your organization'
}
```

&nbsp;&nbsp; **Code: 401**

```bash
{
  status: 'fail',
  message: 'Unauthorized'
}
```

&nbsp;&nbsp; **Code: 404**

```bash
{
  status: 'fail',
  message: 'Can not find the requested url on this server'
}
```

&nbsp;&nbsp; **Code: 500**

```bash
{
  status: 'error',
  message: 'Internal server error'
}
```

<!-- Get a single goals endpoint -->

> ### Get a goal
>
> ### Description

&nbsp; This endpoint get a single goal.

> ### Parameters

| Method | Endpoint        | Body | Parameter | Query                       | Content Type       | Description                                             |
| ------ | --------------- | ---- | --------- | --------------------------- | ------------------ | ------------------------------------------------------- |
| `GET`  | `/goals/single` | null | null      | **org_id** <br> **room_id** | `application/json` | Both the **org_id** and **room_id** fields are required |

> ### Code Sample

```bash
curl -X 'POST' \
  'https://goals.zuri.chat/api/v1/goals?org_id=6145d099285e4a184020742e&room_id=42174f6c-bac3-4526-b71d-daba1cd2a056' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
}'
```

> ### Sample Response

&nbsp;&nbsp; **Code: 200**

```bash
{
  message: "success",
  status: 200,
  data: {
    _id: "613ddbd3e4010959c8dc0c5e",
    category: "#backend",
    createdBy: "Depeju",
    description: "test goal",
    start_date: "2020-10-02",
    due_date: "2020-10-02",
    goal_type: "annual",
    goal_name: "public room",
    isComplete: true,
    isExpired: true,
    room_id: "b66e5fe5-2c66-413c-b2fc-a38d6ab76330"
  }
}

```

&nbsp;&nbsp; **Code: 400**

```bash
{
  status: 'fail',
  message: 'No goal found with the room_id or org_id provided'
}
```

&nbsp;&nbsp; **Code: 401**

```bash
{
  status: 'fail',
  message: 'Unauthorized'
}
```

&nbsp;&nbsp; **Code: 404**

```bash
{
  status: 'fail',
  message: 'Can not find the requested url on this server'
}
```

&nbsp;&nbsp; **Code: 500**

```bash
{
  status: 'error',
  message: 'Internal server error'
}
```

<!-- Update a single goals endpoint -->

> ### Update a goal
>
> ### Description

&nbsp; This endpoint update a single goal.

> ### Parameters

| Method | Endpoint        | Body | Parameter | Query                       | Content Type       | Description                                             |
| ------ | --------------- | ---- | --------- | --------------------------- | ------------------ | ------------------------------------------------------- |
| `PUT`  | `/goals/update` | null | null      | **org_id** <br> **room_id** | `application/json` | Both the **org_id** and **room_id** fields are required |

> ### Code Sample

```bash
curl -X 'PUT' \
  'https://goals.zuri.chat/api/v1/goals?org_id=6145d099285e4a184020742e&room_id=42174f6c-bac3-4526-b71d-daba1cd2a056' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
   -d '{
  "category": "#backend",
  "description": "test goal",
  "goal_type": "annual",
  "goal_name": "public room"
}'
```

> ### Sample Response

&nbsp;&nbsp; **Code: 200**

```bash
{
  message: "success",
  status: 200,
  data: {
    _id: "613ddbd3e4010959c8dc0c5e",
    category: "#backend",
    createdBy: "Depeju",
    description: "test goal",
    start_date: "2020-10-02",
    due_date: "2020-10-02",
    goal_type: "annual",
    goal_name: "public room",
    isComplete: true,
    isExpired: true,
    room_id: "b66e5fe5-2c66-413c-b2fc-a38d6ab76330"
  }
}

```

&nbsp;&nbsp; **Code: 400**

```bash
{
  status: 'fail',
  message: 'No goal found with the room_id or org_id provided'
}
```

&nbsp;&nbsp; **Code: 401**

```bash
{
  status: 'fail',
  message: 'Unauthorized'
}
```

&nbsp;&nbsp; **Code: 404**

```bash
{
  status: 'fail',
  message: 'Can not find the requested url on this server'
}
```

&nbsp;&nbsp; **Code: 500**

```bash
{
  status: 'error',
  message: 'Internal server error'
}
```

<!-- Delete a single goals endpoint -->

> ### Delete a goal
>
> ### Description

&nbsp; This endpoint delete a single goal.

> ### Parameters

| Method   | Endpoint        | Body | Parameter | Query                       | Content Type       | Description                                             |
| -------- | --------------- | ---- | --------- | --------------------------- | ------------------ | ------------------------------------------------------- |
| `DELETE` | `/goals/update` | null | null      | **org_id** <br> **goal_id** | `application/json` | Both the **org_id** and **goal_id** fields are required |

> ### Code Sample

```bash
curl -X 'DELETE' \
  'https://goals.zuri.chat/api/v1/goals?org_id=6145d099285e4a184020742e&goal_id=613fa4a56173056af01b4b26' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
}'
```

> ### Sample Response

&nbsp;&nbsp; **Code: 200**

```bash
{
  message: "success",
  status: 200,
  data: {
    _id: "613ddbd3e4010959c8dc0c5e",
    category: "#backend",
    createdBy: "Depeju",
    description: "test goal",
    start_date: "2020-10-02",
    due_date: "2020-10-02",
    goal_type: "annual",
    goal_name: "public room",
    isComplete: true,
    isExpired: true,
    room_id: "b66e5fe5-2c66-413c-b2fc-a38d6ab76330"
  }
}

```

&nbsp;&nbsp; **Code: 400**

```bash
{
  status: 'fail',
  message: 'There is no goal of this id attached to this organization id that was found.'
}
```

&nbsp;&nbsp; **Code: 401**

```bash
{
  status: 'fail',
  message: 'Unauthorized'
}
```

&nbsp;&nbsp; **Code: 404**

```bash
{
  status: 'fail',
  message: 'Can not find the requested url on this server'
}
```

&nbsp;&nbsp; **Code: 500**

```bash
{
  status: 'error',
  message: 'Internal server error'
}
```

<!-- Mission Endpoint start from here -->

## Mission Endpoint

---

<!-- Get a mission endpoint -->

> ### Get a Mission
>
> ### Description

&nbsp; This endpoint get a mission.

> ### Parameters

| Method | Endpoint   | Body | Parameter       | Query | Content Type       | Description                           |
| ------ | ---------- | ---- | --------------- | ----- | ------------------ | ------------------------------------- |
| `GET`  | `/mission` | null | organization_id | null  | `application/json` | **organization_id** field is required |

> ### Code Sample

```bash
curl -X 'GET' \
  'https://goals.zuri.chat/api/v1/mission/6145d099285e4a184020742e' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
```

> ### Sample Response

&nbsp;&nbsp; **Code: 200**

```bash
{
  message: "success",
  status: 200,
  data: {
    _id: "6145d316285e4a184020744b",
    mission: "Boss I am sleeping",
    vision: "To be the best goal tabbers."
  }
}

```

&nbsp;&nbsp; **Code: 400**

```bash
{
  status: 'fail',
  message: 'No mission found for that organization_id'
}
```

&nbsp;&nbsp; **Code: 401**

```bash
{
  status: 'fail',
  message: 'Unauthorized'
}
```

&nbsp;&nbsp; **Code: 404**

```bash
{
  status: 'fail',
  message: 'Can not find the requested url on this server'
}
```

&nbsp;&nbsp; **Code: 500**

```bash
{
  status: 'error',
  message: 'Internal server error'
}
```

<!-- Update a mission endpoint -->

> ### Update a Mission
>
> ### Description

&nbsp; This endpoint update a mission.

> ### Parameters

| Method | Endpoint          | Body    | Parameter       | Query | Content Type       | Description                           |
| ------ | ----------------- | ------- | --------------- | ----- | ------------------ | ------------------------------------- |
| `PUT`  | `/mission/update` | mission | organization_id | null  | `application/json` | **organization_id** field is required |

> ### Code Sample

```bash
curl -X 'PUT' \
  'https://goals.zuri.chat/api/v1/mission/update/6145d099285e4a184020742e' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
   -d '{
      "mission": "bla bla bla"
    }'
```

> ### Sample Response

&nbsp;&nbsp; **Code: 200**

```bash
{
  message: "success",
  status: 200,
  data: {
    _id: "6145d316285e4a184020744b",
    mission: "Boss I am sleeping",
    vision: "To be the best goal tabbers."
  }
}

```

&nbsp;&nbsp; **Code: 400**

```bash
{
  status: 'fail',
  message: 'No mission found for the organization_id provided'
}
```

&nbsp;&nbsp; **Code: 401**

```bash
{
  status: 'fail',
  message: 'Unauthorized'
}
```

&nbsp;&nbsp; **Code: 404**

```bash
{
  status: 'fail',
  message: 'Can not find the requested url on this server'
}
```

&nbsp;&nbsp; **Code: 500**

```bash
{
  status: 'error',
  message: 'Internal server error'
}
```

<!-- Vision Endpoint start from here -->

## Vision Endpoint

---

<!-- Get a vission endpoint -->

> ### Get a Vision
>
> ### Description

&nbsp; This endpoint get a vision.

> ### Parameters

| Method | Endpoint  | Body | Parameter       | Query | Content Type       | Description                           |
| ------ | --------- | ---- | --------------- | ----- | ------------------ | ------------------------------------- |
| `GET`  | `/vision` | null | organization_id | null  | `application/json` | **organization_id** field is required |

> ### Code Sample

```bash
curl -X 'GET' \
  'https://goals.zuri.chat/api/v1/vision/6145d099285e4a184020742e' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
```

> ### Sample Response

&nbsp;&nbsp; **Code: 200**

```bash
{
  message: "success",
  status: 200,
  data: {
    _id: "6145d346285e4a184020744e",
    organization_id: "6145d099285e4a184020742e",
    vision: "Click to add vision"
  }
}

```

&nbsp;&nbsp; **Code: 400**

```bash
{
  status: 'fail',
  message: 'No vision found for that organization_id'
}
```

&nbsp;&nbsp; **Code: 401**

```bash
{
  status: 'fail',
  message: 'Unauthorized'
}
```

&nbsp;&nbsp; **Code: 404**

```bash
{
  status: 'fail',
  message: 'Can not find the requested url on this server'
}
```

&nbsp;&nbsp; **Code: 500**

```bash
{
  status: 'error',
  message: 'Internal server error'
}
```

<!-- Update a vision endpoint -->

> ### Update a Vision
>
> ### Description

&nbsp; This endpoint update a vision.

> ### Parameters

| Method  | Endpoint  | Body   | Parameter       | Query | Content Type       | Description                           |
| ------- | --------- | ------ | --------------- | ----- | ------------------ | ------------------------------------- |
| `PATCH` | `/vision` | vision | organization_id | null  | `application/json` | **organization_id** field is required |

> ### Code Sample

```bash
curl -X 'PATCH' \
  'https://goals.zuri.chat/api/v1/vision?org_id=6145d099285e4a184020742e' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
   -d '{
      "vision": "bla bla bla"
    }'
```

> ### Sample Response

&nbsp;&nbsp; **Code: 200**

```bash
{
  message: "success",
  status: 200,
  data: {
    _id: "6145d346285e4a184020744e",
    organization_id: "6145d099285e4a184020742e",
    vision: "Click to add vision"
  }
}

```

&nbsp;&nbsp; **Code: 400**

```bash
{
  status: 'fail',
  message: 'No vision found for the organization_id provided'
}
```

&nbsp;&nbsp; **Code: 401**

```bash
{
  status: 'fail',
  message: 'Unauthorized'
}
```

&nbsp;&nbsp; **Code: 404**

```bash
{
  status: 'fail',
  message: 'Can not find the requested url on this server'
}
```

&nbsp;&nbsp; **Code: 500**

```bash
{
  status: 'error',
  message: 'Internal server error'
}
```

<!-- Notification Endpoint start from here -->

## Notification Endpoint

---

<!-- Get a notification endpoint -->

> ### Get a Notification
>
> ### Description

&nbsp; This endpoint update all notifications for a specific user.

> ### Parameters

| Method | Endpoint         | Body | Parameter | Query                    | Content Type       | Description                                    |
| ------ | ---------------- | ---- | --------- | ------------------------ | ------------------ | ---------------------------------------------- |
| `GET`  | `/notifications` | null | null      | org_id <br> user_id <br> | `application/json` | **org_id** and **user_id** fields are required |

> ### Code Sample

```bash
curl -X 'GET' \
  'https://goals.zuri.chat/api/v1/notifications?org_id=6145d099285e4a184020742e&user_id=6145cf0c285e4a1840207426' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
```

> ### Sample Response

&nbsp;&nbsp; **Code: 200**

```bash
{
  message: "success",
  status: 200,
  data: [
    {
      _id: "614ec2dcf31a74e068e4db28",
      colour: "blue",
      createdAt: 1632551644191,
      description: "",
      goalName: "",
      goal_id: "",
      header: "Our mission has been updated.",
      isRead: false,
      org_id: "6145d099285e4a184020742e",
      user_id: "6145cf0c285e4a1840207426"
    },
    {
      _id: "614ec798f31a74e068e4db7c",
      colour: "blue",
      createdAt: 1632552856081,
      description: "",
      goalName: "",
      goal_id: "",
      header: "Our vision has been updated.",
      isRead: true,
      org_id: "6145d099285e4a184020742e",
      user_id: "6145cf0c285e4a1840207426"
    }
  ]
}

```

&nbsp;&nbsp; **Code: 400**

```bash
{
  status: 'fail',
  message: 'org_id and user_id fields are required'
}
```

&nbsp;&nbsp; **Code: 401**

```bash
{
  status: 'fail',
  message: 'Unauthorized'
}
```

&nbsp;&nbsp; **Code: 404**

```bash
{
  status: 'fail',
  message: 'Can not find the requested url on this server'
}
```

&nbsp;&nbsp; **Code: 500**

```bash
{
  status: 'error',
  message: 'Internal server error'
}
```

<!-- Update a notification endpoint -->

> ### Update a Notification
>
> ### Description

&nbsp; This endpoint update a notification.

> ### Parameters

| Method | Endpoint         | Body   | Parameter | Query                                    | Content Type       | Description                                                         |
| ------ | ---------------- | ------ | --------- | ---------------------------------------- | ------------------ | ------------------------------------------------------------------- |
| `PUT`  | `/notifications` | isRead | null      | org_id <br> user_id <br> notification_id | `application/json` | **org_id**, **user_id** and **notification_id** fields are required |

> ### Code Sample

```bash
curl -X 'PUT' \
  'https://goals.zuri.chat/api/v1/notifications?org_id=6145d099285e4a184020742e&user_id=6145cf0c285e4a1840207426&notification_id=614ec2dcf31a74e068e4db28' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
   -d '{
      "isRead": true
    }'
```

> ### Sample Response

&nbsp;&nbsp; **Code: 200**

```bash
{
  message: "success",
  status: 200,
  data: {
    _id: "614ec798f31a74e068e4db7c",
    colour: "blue",
    createdAt: 1632552856081,
    description: "",
    goalName: "",
    goal_id: "",
    header: "Our vision has been updated.",
    isRead: true,
    org_id: "6145d099285e4a184020742e",
    user_id: "6145cf0c285e4a1840207426"
  }
}

```

&nbsp;&nbsp; **Code: 400**

```bash
{
  status: 'fail',
  message: 'org_id, user_id and notification_id fields are required'
}
```

&nbsp;&nbsp; **Code: 401**

```bash
{
  status: 'fail',
  message: 'Unauthorized'
}
```

&nbsp;&nbsp; **Code: 404**

```bash
{
  status: 'fail',
  message: 'Can not find the requested url on this server'
}
```

&nbsp;&nbsp; **Code: 500**

```bash
{
  status: 'error',
  message: 'Internal server error'
}
```

<!-- Update all notification endpoint -->

> ### Update all Notification
>
> ### Description

&nbsp; This endpoint update all notifications for an organization.

> ### Parameters

| Method | Endpoint             | Body | Parameter | Query               | Content Type       | Description                                    |
| ------ | -------------------- | ---- | --------- | ------------------- | ------------------ | ---------------------------------------------- |
| `GET`  | `/notifications/all` | null | null      | org_id <br> user_id | `application/json` | **org_id** and **user_id** fields are required |

> ### Code Sample

```bash
curl -X 'PUT' \
  'https://goals.zuri.chat/api/v1/notifications/all?org_id=6145d099285e4a184020742e' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
      "isRead": true
    }'
```

> ### Sample Response

&nbsp;&nbsp; **Code: 200**

```bash
{
  message: "success",
  status: 200,
  data: [
    {
      _id: "614ec2dcf31a74e068e4db28",
      colour: "blue",
      createdAt: 1632551644191,
      description: "",
      goalName: "",
      goal_id: "",
      header: "Our mission has been updated.",
      isRead: false,
      org_id: "6145d099285e4a184020742e",
      user_id: "6145cf0c285e4a1840207426"
    },
    {
      _id: "614ec798f31a74e068e4db7c",
      colour: "blue",
      createdAt: 1632552856081,
      description: "",
      goalName: "",
      goal_id: "",
      header: "Our vision has been updated.",
      isRead: true,
      org_id: "6145d099285e4a184020742e",
      user_id: "6145cf0c285e4a1840207426"
    }
  ]
}

```

&nbsp;&nbsp; **Code: 400**

```bash
{
  status: 'fail',
  message: 'org_id field is required'
}
```

&nbsp;&nbsp; **Code: 401**

```bash
{
  status: 'fail',
  message: 'Unauthorized'
}
```

&nbsp;&nbsp; **Code: 404**

```bash
{
  status: 'fail',
  message: 'Can not find the requested url on this server'
}
```

&nbsp;&nbsp; **Code: 500**

```bash
{
  status: 'error',
  message: 'Internal server error'
}
```

<!-- Delete notification endpoint -->

> ### Delete a Notification
>
> ### Description

&nbsp; This endpoint delete a notification.

> ### Parameters

| Method   | Endpoint         | Body | Parameter | Query                                    | Content Type       | Description                                                         |
| -------- | ---------------- | ---- | --------- | ---------------------------------------- | ------------------ | ------------------------------------------------------------------- |
| `DELETE` | `/notifications` | null | null      | org_id <br> user_id <br> notification_id | `application/json` | **org_id**, **user_id** and **notification_id** fields are required |

> ### Code Sample

```bash
curl -X 'DELETE' \
  'https://goals.zuri.chat/api/v1/notifications?org_id=6145d099285e4a184020742e&user_id=6145cf0c285e4a1840207426&notification_id=614ec2dcf31a74e068e4db28' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
```

> ### Sample Response

&nbsp;&nbsp; **Code: 200**

```bash
{
  message: "success",
  status: 200,
  data: {
    _id: "614ec798f31a74e068e4db7c",
    colour: "blue",
    createdAt: 1632552856081,
    description: "",
    goalName: "",
    goal_id: "",
    header: "Our vision has been updated.",
    isRead: true,
    org_id: "6145d099285e4a184020742e",
    user_id: "6145cf0c285e4a1840207426"
  }
}

```

&nbsp;&nbsp; **Code: 400**

```bash
{
  status: 'fail',
  message: 'org_id, user_id and notification_id fields are required'
}
```

&nbsp;&nbsp; **Code: 401**

```bash
{
  status: 'fail',
  message: 'Unauthorized'
}
```

&nbsp;&nbsp; **Code: 404**

```bash
{
  status: 'fail',
  message: 'Can not find the requested url on this server'
}
```

&nbsp;&nbsp; **Code: 500**

```bash
{
  status: 'error',
  message: 'Internal server error'
}
```

<!-- Create target api -->

> ### Call Target API
>
> ### Description

You can call by organizationid and goalid. Please note that you&#39;ll need to have the ids prior and they are not by no means generated by this api

> ### Parameters

| Method | Endpoint        | Body | Parameter | Query               | Content Type       | Description                             |
| ------ | --------------- | ---- | --------- | ------------------- | ------------------ | --------------------------------------- |
| `GET`  | `/goals/target` | null | null      | org_id <br> goal_id | `application/json` | **org_id** and **goal_id** are required |

> ### Code Sample

```bash
curl -X 'GET' \
 'https://goals.zuri.chat/api/v1/target?org_id=613ddbd3e4010959c8dc0c5e&amp&goal_id=613ddbd3e4010959c8dc0c5e\
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
}'
```

> ### Sample Response

&nbsp;&nbsp; **Code: 200**

```bash
{
  message: 'success',
  status: 200,
  data: {
    _id: '613ddbd3e4010959c8dc0c5e',
    goal_id: '613ddbd3e4010959c8dc0c5e'
    targets: {
      achieved: "false",
      milestone: {milestone_text: "I want to build a house"}
      sub_milestones: {
        {
          achieved: "true",
          milestone_text: "I have gotten cement"
      }
      {
      achieved: "false",
      milestone_text: "I have not gotten cement";
      }
    }
type: "numeric"
  }
}
```

&nbsp;&nbsp; **Code: 400**

```bash
{
  status: 'fail',
  message: 'No target found with the goal_id or org_id provided';

}
```

&nbsp;&nbsp; **Code: 401**

```bash
{
  status: 'fail',
  message: 'Unauthorized'
}
```

&nbsp;&nbsp; **Code: 404**

```bash
{
  status: 'fail',
  message: 'Can not find the requested url on this server'
}
```

&nbsp;&nbsp; **Code: 500**

```bash
{
  status: 'error',
  message: 'Internal server error'
}
```

<!-- Update target api -->

> ### update a target

> ### Description

&nbsp; This endpoints update a target goals passing in the targetId as parameter and org_ID as query.

> ### Parameters

| Method | Endpoint                          | Body | Parameter | Query               | Content Type       | Description                               |
| ------ | --------------------------------- | ---- | --------- | ------------------- | ------------------ | ----------------------------------------- |
| `PUT`  | `/api/v1/goals/target/:id?org_id` | null | null      | org_id <br> goal_id | `application/json` | **org_id** and **target_id** are required |

> ### Code Sample

```bash
curl -X 'Put' \
  'https://goals.zuri.chat/api/v1/target/:id?org_id=613ddbd3e4010959c8dc0c5e&amp&goal_id=613ddbd3e4010959c8dc0c5e' \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
}'
```

### Sample Response

&nbsp;&nbsp;&nbsp; **Code 200**

```bash
{
  message:'success',
  status: 200,
  data:{}
}
```

&nbsp;&nbsp;&nbsp; **Code 500**

```bash
{
  message:'Server error',
  status: 'failed',
  data:null,
}
```

<!-- Delete target api -->

> ### Delete a target

> ### Description

&nbsp; This endpoints delete a target goals passing in the targetId as parameter.

> ### Parameters

| Method   | Endpoint  | Body | Parameter | Query | Content Type       | Description                |
| -------- | --------- | ---- | --------- | ----- | ------------------ | -------------------------- |
| `DELETE` | `/target` | null | target_id | null  | `application/json` | **target_id** are required |

> ### Code Sample

```bash
curl -X 'DELETE' \
  'https://goals.zuri.chat/api/v1/target/:id?org_id=613ddbd3e4010959c8dc0c5e&amp&goal_id=613ddbd3e4010959c8dc0c5e' \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
}'
```

### Sample Response

&nbsp;&nbsp;&nbsp; **Code 200**

```bash
{
  status: 200,
}
```



<!-- Search Plugin api -->

> ### Search Plugin

> ### Description

&nbsp; This endpoints searches the plugin for the provided key

> ### Parameters

| Method   | Endpoint                        | Body | Parameter              | Query | Content Type       | Description                |
| -------- | --------------------------------| ---- | ---------------------- | ----- | ------------------ | -------------------------- |
| `GET` | `/search/api/v1/:org_id/:member_id` | null | org_id </br> member_id | key </br> id </br> limit </br> page | `application/json` | **id** and **key** are required |

> ### Code Sample

```bash
curl -X 'GET' \
  'https://goals.zuri.chat/api/v1/search/614679ee1a5607b13c00bcb7/6145d0ff285e4a1840207433/?id=goals&limit=15&page=1key=annual' \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
}'
```

### Sample Response

&nbsp;&nbsp;&nbsp; **Code 200**

```bash
{
    "status": "ok",
    "statusCode": 200,
    "pagination": {
        "current_page": 1,
        "per_page": 15,
        "page_count": 1,
        "first_page": 1,
        "last_page": 1,
        "total_count": 1
    },
    "query": "devops",
    "plugin": "Goals",
    "data": [
        {
            "_id": "6152fc575fc425e7e5f3b9a6",
            "category": "Devops",
            "created_at": "2021-9-28",
            "description": "i think this should work",
            "due_date": "2021-10-14",
            "goal_name": "frontend first goal",
            "goal_type": "quarterly",
            "isComplete": false,
            "isExpired": false,
            "room_id": "c342cf19-f275-4856-9292-de488d4d926a",
            "start_date": "2021-10-09",
            "url": "https://goals.zuri.chat/goals/room/614679ee1a5607b13c00bcb7"
        }
    ],
    "filter_suggestions": {
        "in": [
            "goals"
        ],
        "from": [
            "devops"
        ]
    }
}
```

&nbsp;&nbsp;&nbsp; **Code 500**

```bash
{
    "message": "No search key or ID was provided",
    "error": "error",
    "statusCode": 500
}
```
