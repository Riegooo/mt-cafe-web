
const menu = document.getElementById("menu");


fetch('./menu_data.json')
    .then(res => res.json())
    .then(data => {

        const hot = data['Hot Beverage'];
        for(const [item, properties] of Object.entries(hot)){

        let ingredient_format = ""
        for (const ingredient of properties.Ingredients) {
            ingredient_format += `<p>${ingredient}</p><br>`
        }

        console.log(ingredient_format)
        const newContent = 
            `
            <div class="menu-cards">
                <img src=${properties.img_path} alt="">
                <div class="menu-item-info">
                    <div class="menu-item-title" id="item-toggle-americano">
                        <h2>${item}</h2>
                        <i class="fa-solid fa-circle-info menu-item"></i>
                    </div>
                    <p>
                        ${properties.description}
                    </p>
                    
                    <div class="menu-item-buy">
                        <p>${properties.price}</p>
                        <button>
                            <span>BUY NOW</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                        
                    </div>
                </div>

                
                <div class="click_image_info-americano">
                    <div class="info-container-americano">
                        <div class="info-contents-camericano">
                            <i class="fa-solid fa-xmark close-info-americano"></i>
                            <img src="../images/menu-images/hot-beverages/Americano-coffee.png" alt="">
                            <div class="info-header">
                                <h3>${item}</h3>
                            </div>
                            <div class="info-texts">
                                <p>
                                    ${properties.Extended_Description}
                                </p>
                            </div>

                            <div class="info-specs">
                                <div class="item-ingredients">
                                    <div class="ingredients-header">
                                        <h3>Ingredients</h3>
                                    </div>
                                        ${ingredient_format}
                                </div>

                                <div class="item-kcal">
                                    <div class="kcal-header">
                                        <h3>KCAL</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            menu.insertAdjacentHTML('beforeend', newContent);

        }
    });


