const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');
const addWebsiteBtn = document.getElementById('add-website-btn');
const menuIcon = document.querySelector('.menu-icon');
const sideMenu = document.getElementById('side-menu');
const websiteSelection = document.getElementById('website-selection');
const closeMenuButton = document.getElementById('close-menu-btn');

// Categorized websites 
const platforms = {
  'Search Engines': [
    {
      name: 'Google',
      logo: 'https://image.similarpng.com/very-thumbnail/2020/06/Logo-google-icon-PNG.png', 
      searchUrl: 'https://www.google.com/search',
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Bing',
      logo: 'https://www.thewindowsclub.com/wp-content/uploads/2020/11/Bing-Logo-1.png',
      searchUrl: 'https://www.bing.com/search', 
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'DuckDuckGo',
      logo: 'https://duckduckgo.com/assets/icons/meta/DDG-icon_256x256.png',
      searchUrl: 'https://duckduckgo.com/',
      searchQueryParameter: 'q' // Parameter for search queries
    }
  ],
  'Social Media': [
    {
      name: 'YouTube',
      logo: 'https://cdn-icons-png.flaticon.com/256/1384/1384060.png',
      searchUrl: 'https://www.youtube.com/results',
      searchQueryParameter: 'search_query' // Parameter for search queries
    },
    {
      name: 'Twitter',
      logo: 'https://abs.twimg.com/favicons/twitter.ico',
      searchUrl: 'https://twitter.com/search',
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Facebook',
      logo: 'https://www.facebook.com/favicon.ico',
      searchUrl: 'https://www.facebook.com/search/top',
      searchQueryParameter: 'q' // Parameter for search queries
    }
  ],
  'Shopping': [
    {
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png',
      searchUrl: 'https://www.amazon.com/s',
      searchQueryParameter: 'k' // Parameter for search queries
    },
    {
      name: 'Flipkart',
      logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/flipkart-icon.png', 
      searchUrl: 'https://www.flipkart.com/search', 
      searchQueryParameter: 'q' // Parameter for search queries
    }
  ],
  'Education': [
    {
      name: 'Wikipedia',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png',
      searchUrl: 'https://en.wikipedia.org/wiki/Special:Search', 
      searchQueryParameter: 'search' // Parameter for search queries
    },
    {
      name: 'Google Scholar',
      logo: 'https://scholar.google.com/favicon.ico',
      searchUrl: 'https://scholar.google.com/scholar',
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Coursera',
      logo: 'https://www.coursera.org/favicon.ico',
      searchUrl: 'https://www.coursera.org/search',
      searchQueryParameter: 'query' // Parameter for search queries
    },
    {
      name: 'Khan Academy',
      logo: 'https://www.khanacademy.org/favicon.ico',
      searchUrl: 'https://www.khanacademy.org/search',
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Duolingo',
      logo: 'https://e7.pngegg.com/pngimages/38/992/png-clipart-duolingo-logo-thumbnail-tech-companies-thumbnail.png',
      searchUrl: 'https://www.duolingo.com/search',
      searchQueryParameter: 'query' // Parameter for search queries
    }
  ],
  'News': [ // Add Google News to the News category
    {
      name: 'Google News',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Google_News_icon.svg/2503px-Google_News_icon.svg.png', 
      searchUrl: 'https://news.google.com/search',
      searchQueryParameter: 'q' // Parameter for search queries
    }
  ],
  'Other': [
    {
      name: 'Stack Overflow',
      logo: 'https://stackoverflow.com/favicon.ico',
      searchUrl: 'https://stackoverflow.com/search',
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Perplexity',
      logo: 'https://seeklogo.com/images/P/perplexity-ai-logo-13120A0AAE-seeklogo.com.png',
      searchUrl: 'https://www.perplexity.ai/search',
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Quora',
      logo: 'https://www.quora.com/favicon.ico',
      searchUrl: 'https://www.quora.com/search', 
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Reddit',
      logo: 'https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png',
      searchUrl: 'https://www.reddit.com/search', 
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Pinterest',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png',
      searchUrl: 'https://www.pinterest.com/search/pins',
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'LinkedIn',
      logo: 'https://www.linkedin.com/favicon.ico',
      searchUrl: 'https://www.linkedin.com/search/results/all',
      searchQueryParameter: 'keywords' // Parameter for search queries
    },
    {
      name: 'Bing Image Creator',
      logo: 'https://imgeng.jagran.com/images/2023/mar/Bing%201679474760226.jpg', 
      searchUrl: 'https://www.bing.com/images/create', 
      searchQueryParameter: null // No search parameter, the user will be redirected to the page.
    },
    {
      name: 'IMDb',
      logo: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/171_Imdb_logo_logos-512.png',
      searchUrl: 'https://www.imdb.com/find', // Updated search URL for IMDb
      searchQueryParameter: 'q' // Parameter for search queries
    }
  ]
};

// Function to create website checkboxes in the side menu
function createWebsiteCheckboxes() {
  let html = '';
  for (const category in platforms) {
    html += `<div class="website-category">
              <h3>${category}</h3>`;
    platforms[category].forEach(platform => {
      html += `<div class="website-item"> <div class="website-checkbox">
                  <input type="checkbox" id="${platform.name}" name="${platform.name}" checked>
                  <label for="${platform.name}">${platform.name}</label>
                </div>
                <button class="delete-btn" data-website-name="${platform.name}">Delete</button>
              </div>`;
    });
    html += '</div>';
  }
  websiteSelection.innerHTML = html;

  // Event listener for checkboxes
  const checkboxes = websiteSelection.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      updateSearchResults();
    });
  });

  // Add event listeners to delete buttons after checkboxes are created
  const deleteButtons = websiteSelection.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const websiteName = button.dataset.websiteName; // Get the website name to delete

      // Find the category and index of the website to delete
      let categoryToDelete = null;
      let indexToDelete = null;

      for (const category in platforms) {
        const index = platforms[category].findIndex(website => website.name === websiteName);
        if (index !== -1) {
          categoryToDelete = category;
          indexToDelete = index;
          break;
        }
      }

      if (categoryToDelete && indexToDelete !== -1) {
        platforms[categoryToDelete].splice(indexToDelete, 1); // Remove the website
        createWebsiteCheckboxes(); // Update the checkboxes
        updateSearchResults(); // Update search results
      }
    });
  });
}

// Function to extract search information from a sample URL
function extractSearchInfo(sampleSearchUrl) {
  const urlParts = new URL(sampleSearchUrl);
  const searchUrl = urlParts.origin + urlParts.pathname;
  const searchParams = new URLSearchParams(urlParts.search);
  const searchQueryParameter = searchParams.keys().next().value;
  const searchTerm = searchParams.get(searchQueryParameter);

  return [searchUrl, searchQueryParameter, searchTerm];
}


// Function to update search results based on selected websites
function updateSearchResults(selectedCategory = null) {
  const selectedPlatforms = [];
  const checkboxes = websiteSelection.querySelectorAll('input[type="checkbox"]:checked');
  checkboxes.forEach(checkbox => {
    selectedPlatforms.push(checkbox.id);
  });

  const searchTerm = searchInput.value.trim();

  resultsContainer.innerHTML = ''; // Clear previous results

  if (selectedCategory) { // If a category is selected
    // Show websites from the selected category first
    platforms[selectedCategory].forEach(platform => {
      const resultElement = document.createElement('a'); // Use 'a' for links
      resultElement.classList.add('result');
      // Construct the search URL
      if (platform.searchQueryParameter) {
        resultElement.href = `${platform.searchUrl}?${platform.searchQueryParameter}=${searchTerm}`; 
      } else {
        resultElement.href = `${platform.searchUrl}`;
      }
      resultElement.target = '_blank'; // Open in a new tab 

      resultElement.addEventListener('click', () => {
        // Make it open in a new tab (or window)
        window.open(`${platform.searchUrl}?${platform.searchQueryParameter}=${searchTerm}`, 'Search Window', 'width=600,height=400'); 
      });

      resultElement.innerHTML = `
        <img src="${platform.logo}" class="platform-logo" alt="${platform.name} Logo">
        <div class="platform-name">${platform.name}</div>
      `;
      resultsContainer.appendChild(resultElement);
    });

    // Then show the remaining websites
    selectedPlatforms.forEach(platformName => {
      if (!platforms[selectedCategory].some(p => p.name === platformName)) {
        const resultElement = document.createElement('a'); // Use 'a' for links
        resultElement.classList.add('result');
        // Construct the search URL
        const platform = platforms[Object.keys(platforms).find(category => platforms[category].some(p => p.name === platformName))]
                           .find(p => p.name === platformName);
        if (platform.searchQueryParameter) {
          resultElement.href = `${platform.searchUrl}?${platform.searchQueryParameter}=${searchTerm}`; 
        } else {
          resultElement.href = `${platform.searchUrl}`;
        }
        resultElement.target = '_blank'; // Open in a new tab 

        resultElement.addEventListener('click', () => {
          // Make it open in a new tab (or window)
          window.open(`${platform.searchUrl}?${platform.searchQueryParameter}=${searchTerm}`, 'Search Window', 'width=600,height=400'); 
        });

        resultElement.innerHTML = `
          <img src="${platform.logo}" class="platform-logo" alt="${platform.name} Logo">
          <div class="platform-name">${platform.name}</div>
        `;
        resultsContainer.appendChild(resultElement);
      }
    });

  } else { // If no category is selected
    // Show all results, as before
    selectedPlatforms.forEach(platformName => {
      const platform = platforms[Object.keys(platforms).find(category => platforms[category].some(p => p.name === platformName))]
                           .find(p => p.name === platformName);
      if (platform) {
        const resultElement = document.createElement('a'); // Use 'a' for links
        resultElement.classList.add('result');
        // Construct the search URL
        if (platform.searchQueryParameter) {
          resultElement.href = `${platform.searchUrl}?${platform.searchQueryParameter}=${searchTerm}`; 
        } else {
          resultElement.href = `${platform.searchUrl}`;
        }
        resultElement.target = '_blank'; // Open in a new tab 

        resultElement.addEventListener('click', () => {
          // Make it open in a new tab (or window)
          window.open(`${platform.searchUrl}?${platform.searchQueryParameter}=${searchTerm}`, 'Search Window', 'width=600,height=400'); 
        });

        resultElement.innerHTML = `
          <img src="${platform.logo}" class="platform-logo" alt="${platform.name} Logo">
          <div class="platform-name">${platform.name}</div>
        `;
        resultsContainer.appendChild(resultElement);
      }
    });
  }
}

// Function to create category buttons
function createCategoryButtons() {
  const categoryButtonsContainer = document.getElementById('category-buttons');
  categoryButtonsContainer.innerHTML = ''; // Clear any existing buttons

  for (const category in platforms) {
    const button = document.createElement('button');
    button.classList.add('category-button');
    button.textContent = category;
    button.dataset.category = category; // Store the category name in the button's data attribute

    button.addEventListener('click', () => {
      const selectedCategory = button.dataset.category;
      updateSearchResults(selectedCategory); // Update search results based on the selected category
    });

    categoryButtonsContainer.appendChild(button);
  }
}

// Event listener for the "Add Website" button (now in the header)
addWebsiteBtn.addEventListener('click', () => {
  // Prompt for website name
  const newWebsiteName = prompt('Enter the name of the website:', '');

  // Prompt for a sample search URL
  const sampleSearchUrl = prompt('Enter a sample search URL from this website (e.g., "https://www.google.com/search?q=example"):', '');

  if (newWebsiteName && sampleSearchUrl) {
    if (isValidUrl(sampleSearchUrl)) { // Validate the URL
      const [searchUrl, searchQueryParameter, searchTerm] = extractSearchInfo(sampleSearchUrl);

      if (searchUrl && searchQueryParameter) {
        const newWebsite = {
          name: newWebsiteName,
          logo: 'https://www.example.com/favicon.ico', // Placeholder for logo - you can add a way to get the logo dynamically later
          searchUrl: searchUrl,
          searchQueryParameter: searchQueryParameter // Store the search query parameter
        };

        // Add the new website to a suitable category (you'll need to implement logic for this)
        platforms['Other'].push(newWebsite);

        // Update the side menu with the new website
        createWebsiteCheckboxes();
        updateSearchResults();
        createCategoryButtons();
      } else {
        alert('Please enter a valid sample search URL.');
      }
    } else {
      alert('Please enter a valid website URL.');
    }
  }
});

// Event listener for the menu icon
menuIcon.addEventListener('click', () => {
  sideMenu.classList.toggle('show');
  menuIcon.classList.toggle('active'); // Add active class to the menu icon
});

// Event listener for the close menu button
closeMenuButton.addEventListener('click', () => {
  sideMenu.classList.remove('show');
  menuIcon.classList.remove('active'); // Remove active class from the menu icon
});

// Initialize the side menu with website checkboxes
createWebsiteCheckboxes();

// Initial update of search results
updateSearchResults();

// Event listener for search input
searchInput.addEventListener('input', () => {
  updateSearchResults();
});

// Function to validate the URL
function isValidUrl(url) {
  const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\.-]+(?:\/[\w\.\-]+)*\/?$/;
  return urlRegex.test(url);
}

// Create category buttons on page load
createCategoryButtons();