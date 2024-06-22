/* Posts Page JavaScript */

"use strict";

document.addEventListener("DOMContentLoaded", (event) => {
  const profileImages = [
    "https://media.istockphoto.com/id/1419922260/photo/3d-render-of-a-cat-playing-video-games-with-a-vr-headset.webp?b=1&s=170667a&w=0&k=20&c=cOMTzhJgUbE_GRZUturqnUoZff1wEvSaiRNYD3Nc1HQ=",
    "https://media.istockphoto.com/id/879267420/photo/funny-dog-wearing-ski-goggles-christmas-concept.webp?b=1&s=170667a&w=0&k=20&c=ySR_QDd2czgUTHObV0Ja6_o0GVVlmrYf3BoDfjQLyrk=",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR7eEB2QjfuiAWOPy3B1iF6udQ8q7pJR9CRWjlm2vAdjyyu8E69Z3uh3Of8W3C0wYU2Mk&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu64lKTfGwfl8C3cKLThixyO53rsj-qe892A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuuabpnD2M-DqCbEiCKmsOfbOLo-d3oUNuAg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfV-991JcCVPLiw7AOJgHWWXBSVOD2JxQ5cg&s",


    // Add as many images as you have
  ];

  const getRandomProfileImage = () => {
    const randomIndex = Math.floor(Math.random() * profileImages.length);
    return profileImages[randomIndex];
  };

  const fetchUserInfo = (username) => {
    return fetch(
      `http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${username}`,
      {
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkphbmVEb2UwMSIsImlhdCI6MTcxOTAwMTI5NCwiZXhwIjoxNzE5MDg3Njk0fQ.OndsfP8mpU7dadPMqB6RUGGVVwxkCxdxU1O8ok_t-wM'
        },
      }
    ).then((response) => response.json());
  };

  fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=50&offset=0', {
    headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkphbmVEb2UwMSIsImlhdCI6MTcxOTAwMTI5NCwiZXhwIjoxNzE5MDg3Njk0fQ.OndsfP8mpU7dadPMqB6RUGGVVwxkCxdxU1O8ok_t-wM'
    }
  })
    .then((response) => response.json())
    .then((posts) => {
      const postsContainer = document.querySelector(".col-md-8");
      postsContainer.innerHTML = ""; // Clear existing content

      posts.forEach((post) => {
        fetchUserInfo(post.username)
          .then((userInfo) => {
            const postElement = document.createElement("div");
            postElement.classList.add("card", "mb-4");

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const userDiv = document.createElement("div");
            userDiv.classList.add("d-flex", "mb-3");

            const profileImg = document.createElement("img");
            profileImg.src = getRandomProfileImage(); // Assign a random profile image
            profileImg.classList.add("rounded-circle", "me-3");
            profileImg.alt = "Profile Picture";
            profileImg.width = 50;

            const userInfoDiv = document.createElement("div");

            const usernameH5 = document.createElement("h5");
            usernameH5.classList.add("mb-0");
            usernameH5.id = "username";
            usernameH5.textContent = post.username;

            const postTime = document.createElement("small");
            postTime.classList.add("text-muted");
            postTime.textContent = new Date(post.createdAt).toLocaleString();

            userInfoDiv.appendChild(usernameH5);
            userInfoDiv.appendChild(postTime);

            userDiv.appendChild(profileImg);
            userDiv.appendChild(userInfoDiv);

            cardBody.appendChild(userDiv);

            if (userInfo.bio) {
              const bioTextH5 = document.createElement("h5");
              bioTextH5.id = "bio";
              bioTextH5.classList.add("text-muted"); // Make bio text muted
              bioTextH5.textContent = userInfo.bio;
              cardBody.appendChild(bioTextH5);
            }

            const postContentP = document.createElement("p");
            postContentP.classList.add("mt-3");
            postContentP.id = "post";
            postContentP.textContent = post.text;

            const interactionDiv = document.createElement("div");
            interactionDiv.classList.add(
              "d-flex",
              "justify-content-between",
              "align-items-center"
            );

            const likeDiv = document.createElement("div");

            const likeButton = document.createElement("button");
            likeButton.classList.add("btn", "btn-light");
            likeButton.innerHTML =
              '<i class="bi bi-heart" id="likes"></i> Like';
            const likeCount = document.createElement("span");
            likeCount.textContent = post.likes.length;

            likeDiv.appendChild(likeButton);
            likeDiv.appendChild(likeCount);

            interactionDiv.appendChild(likeDiv);

            cardBody.appendChild(postContentP);
            cardBody.appendChild(document.createElement("hr"));
            cardBody.appendChild(interactionDiv);

            postElement.appendChild(cardBody);
            postsContainer.appendChild(postElement);
          })
          .catch((error) => console.error("Error fetching user info:", error));
      });
    })
    .catch((error) => console.error("Error fetching posts:", error));
});
