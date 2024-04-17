const axios = require('axios');
const cheerio = require('cheerio');

async function searchAmazon(productName) {
    try {        
        // Search for the product on Amazon
        const encodedProductName = encodeURIComponent(productName);
        const searchUrl = `https://www.amazon.com/s?k=${encodedProductName}`;
        const searchResponse = await axios.get(searchUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            },
        });
        const $ = cheerio.load(searchResponse.data);

        // Find the link to the Best Seller book
        const bestSellerLink = $('.a-badge-text:contains("Best Seller")').closest('.s-result-item').find('a.a-link-normal').attr('href');
        if (!bestSellerLink) {
            console.log('Best Seller not found');
            return;
        }

        // Get the URL of the Best Seller book
        const bestSellerUrl = 'https://www.amazon.com' + bestSellerLink;
        // Fetch the page of the Best Seller book
        const bestSellerResponse = await axios.get(bestSellerUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            },
        });
        const bestSellerHtml = bestSellerResponse.data;
        const bestSeller$ = cheerio.load(bestSellerHtml);

        // Find and read reviews
        const reviews = bestSeller$('.a-section.review').slice(0, 10).map((index, element) => {
            const reviewTitle = $(element).find('.a-section.review .a-text-bold').text().trim().replace(/\s+/g, ' ').trim();
            const starRating = $(element).find('.a-icon-alt').text().trim();
            const verifiedPurchase = $(element).find('.review-format-strip').text().trim();
            
            // Return the review details
            return  {
                title: reviewTitle,
                rating: starRating,
                verified: verifiedPurchase
            };
        }).get().filter(review => review !== null); // Ignore null reviews
        
        console.log("URL for BestSeller: \n", bestSellerUrl, '\n');
        console.log('Top Reviews:\n');
        reviews.forEach((review, index) => {
            console.log(`${index + 1}. Title: ${review.title}`);
            console.log(`   Rating: ${review.rating}`);
            console.log(`   Verified Purchase: ${review.verified}\n`);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Usage
searchAmazon('sql for beginners');
