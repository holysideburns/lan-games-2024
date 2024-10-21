let games = [];
let categories = [];

const mainElement = document.getElementById("game-list")

function renderGames() {
    let gamesHTML = "";
    if (games.length > 0 && categories.length > 0) {
        games.forEach(game => {
            const xboxText = game.xboxGamePass ? "✔️Yes" : "❌No";
            
            gamesHTML += `
                <section class="game-section" id="game-section">
                    <section class="game-left-section">
                        <h2 class="game-title">${game.title}</h2>
                        <p class="game-description">${game.description}</p>
                        <p class="game-comment">"${game.comment}"</p>
                    </section>
                    <section class="game-right-section">
                        <!--<img class="game-image" src="${game.imageSrc}">-->
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
                                <span class="game-detail">Recent reviews: </span>
                                <span class="game-detail-value">${game.recentReviews}</span>
                            </div>
                            <div class="game-detail-row">
                                <span class="game-detail">Xbox Game Pass: </span>
                                <span class="game-detail-value">${xboxText}</span>
                            </div>
                            <div class="game-detail-row">
                                <a class="store-link" href="${game.storeLink}">Store link</a>
                            </div>
                        </div>
                        <!--
                        <h3 class="game-vote-heading">Wanna play?</h3>
                        <div class="game-vote-buttons-container">
                            
                            <button class="game-vote-button">Yes</button>
                            <button class="game-vote-button">No</button>
                        </div>
                        -->
                    </section>
                </section>
            `
        })
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
