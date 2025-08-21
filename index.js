// Write your code here!
// Function to display the posts in a given list element
function displayPosts(posts, postListElement) {
  // Clear any existing content to prevent duplicate entries in a testing scenario
  // where the function might be called multiple times in a test suite.
  postListElement.innerHTML = ''; 

  posts.forEach((post) => {
    const li = document.createElement("li"); // Create a new li tag
    const h1 = document.createElement("h1"); // Create a new h1 tag
    h1.textContent = post.title; // Add the title as the textContent

    const p = document.createElement("p"); // Create a new p tag
    p.textContent = post.body; // Add the body as the textContent

    li.appendChild(h1); // Append h1 to li
    li.appendChild(p); // Append p to li
    postListElement.appendChild(li); // Append li to the ul
  });
}

// Refactored with Async/Await
async function fetchAndDisplayPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
    const postList = document.getElementById("post-list"); 
    displayPosts(posts, postList);
  } catch (error) {
    console.error("Error fetching or displaying posts:", error);
  }
}

// Ensure the DOM is fully loaded before attempting to fetch and display posts
// However, in a Jest environment where the test directly imports and calls the function,
// this listener might be bypassed or not reliable for precise timing.
document.addEventListener("DOMContentLoaded", fetchAndDisplayPosts);

// Export the function so it can be imported and directly called in the Jest test.
// This is the most reliable way to ensure the asynchronous function completes before assertions.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    displayPosts,
    fetchAndDisplayPosts
  };
}