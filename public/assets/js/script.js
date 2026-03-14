let token = localStorage.getItem("authToken");

function populateCategories() {
  const categorySelect = document.getElementById("post-category");

  fetch("http://localhost:3001/api/categories")
    .then(res => res.json())
    .then(categories => {
      categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.categoryName;
        categorySelect.appendChild(option);
      });
    })
    .catch(err => console.error("Error loading categories:", err));
}

function resetCategories() {
  const categorySelect = document.getElementById("post-category");
  categorySelect.innerHTML = '<option value="">Select a category</option>';
}


function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  fetch("http://localhost:3001/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errors) {
        alert(data.errors[0].message);
      } else {
        alert("User registered successfully");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  fetch("http://localhost:3001/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      //Store the token in localStorage
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        // Also store the user data in localStorage for later use in createPost()
        localStorage.setItem("userData", JSON.stringify(data.userData.username));
        localStorage.setItem("userId", data.userData.id);

        token = data.token; // Update the token variable with the new token

        alert("Login successful");

        // Fetch the posts list
        fetchPosts();

        // Hide the auth container and show the app container as we're now logged in
        document.getElementById("auth-container").classList.add("hidden");
        document.getElementById("app-container").classList.remove("hidden");
        populateCategories(); // Load the dropdown options
      } else {
        alert("data.message: " + data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function logout() {
  fetch("http://localhost:3001/api/users/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  }).then(() => {
    // Clear the token from the local storage as we're now logged out
    localStorage.removeItem("authToken");
    token = null;
    document.getElementById("auth-container").classList.remove("hidden");
    document.getElementById("app-container").classList.add("hidden");
    resetCategories(); // Clear the dropdown options when logging out
  });
}

function fetchPosts() {
  fetch("http://localhost:3001/api/posts/with-details", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((posts) => {
      const postsContainer = document.getElementById("posts");
      postsContainer.innerHTML = "";
      posts.forEach((post) => {
        const div = document.createElement("div");
        const categoryMap = post.category ? post.category.categoryName : "Uncategorized";
        const userMap = post.user ? post.user.username : "Unknown User";
        console.log(`Username grabbed: ${userMap}`);
        div.innerHTML = `<h3>${post.title}</h3><p>${post.content
          }</p><small>Lyna By: ${userMap} on ${new Date(
            post.createdOn
          ).toLocaleString()}</small> in category ${categoryMap}`;
        postsContainer.appendChild(div);
      });
    });
}

function createPost() {
  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;
  // Get the selected category id from the dropdown
  const currentCategoryId = document.getElementById("post-category").value;
  // Get the username from localStorage
  const currentUsername = localStorage.getItem("userData");
  // Get the user ID from localStorage
  const currentUserId = localStorage.getItem("userId");
  console.log("Creating post with title:", title);
  console.log("Content:", content);
  console.log("Category ID:", currentCategoryId);
  console.log("Username:", currentUsername);
  console.log("User ID:", currentUserId);

  fetch("http://localhost:3001/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({ userId: currentUserId, title, content, postedBy: currentUsername, categoryId: currentCategoryId }),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Post created successfully");
      fetchPosts();
    });
}