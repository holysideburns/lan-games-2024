let games = [];
let categories = [];

const mainElement = document.getElementById("game-list")

function renderGames() {
    let gamesHTML = "";
    if (games.length > 0 && categories.length > 0) {
        // Create a map of category IDs to their full category objects for easy lookup
        const categoryMap = new Map(categories.map(category => [category.id, category]));
        
        const gamesByCategory = new Map();
        categories.forEach(category => {
            gamesByCategory.set(category.id, []);
        });
        
        // Sort enabled games into their respective category arrays
        games.forEach(game => {
            if (game.enabled) {
                const categoryGames = gamesByCategory.get(game.category);
                if (categoryGames) {
                    categoryGames.push(game);
                }
            }
        });
        
        categories.forEach(category => {
            const categoryGames = gamesByCategory.get(category.id);
            
            // Only render category and games if there are enabled games in this category
            if (categoryGames && categoryGames.length > 0) {
                gamesHTML += `
                    <h1 class="category-header">${category.category}</h1>
                `;
                
                categoryGames.forEach(game => {
                    const xboxText = game.xboxGamePass ? "Yes✔️" : "No❌";
                    const earlyAccessText = game.earlyAccess ? "Yes✔️" : "No❌";
                    
                    gamesHTML += `
                        <section class="game-section" id="game-section">
                            <section class="game-left-section">
                                <h2 class="game-title">${game.title}</h2>
                                <p class="game-description">${game.description}</p>
                                <p class="game-comment">"${game.comment}"</p>
                                <p class="game-comment-signature">- Jimmy</p>
                            </section>
                            <section class="game-right-section">
                                <div class="game-video">
                                    <iframe 
                                        src="https://www.youtube.com/embed/${game.youtubeId}"
                                        title="YouTube video player" 
                                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                                        frameborder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        referrerpolicy="strict-origin-when-cross-origin" 
                                        allowfullscreen>
                                    </iframe>
                                </div>
                                <div class="game-details-container">
                                    <div class="game-detail-row">
                                        <span class="game-detail">Recent Steam Reviews: </span>
                                        <a href="https://store.steampowered.com/app/${game.steamId}" class="game-detail-value steam-link">${game.recentReviews}</a>
                                    </div>                  
                                    <div class="game-detail-row">
                                        <span class="game-detail">Early Access: </span>
                                        <span class="game-detail-value">${earlyAccessText}</span>
                                        <span class="game-detail-separator"> | </span>
                                        <span class="game-detail">Xbox Game Pass: </span>
                                        <span class="game-detail-value">${xboxText}</span>
                                    </div>
                                    <div class="game-detail-row">
                                        <a class="store-link" href="${game.storeLink}" target="_blank">Store link</a>
                                    </div>
                                </div>
                            </section>
                        </section>
                    `;
                });
            }
            gamesHTML += `<br>`;
        });
    } else {
        console.log('Data not loaded yet');
    }
    mainElement.innerHTML = gamesHTML;
}

function loadGamesAndCategories() {
  fetch('games.json')
    .then(response => response.json())
    .then(data => {
      games = data.games;
      categories = data.categories;
      console.log('Games and categories loaded successfully');
      renderGames()
    })
    .catch(error => {
      console.error('Error loading games and categories:', error);
    });
}

loadGamesAndCategories()
