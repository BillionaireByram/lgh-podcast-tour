// Trevor Podcast Tour Landing Page - Updated with Let's Geaux Hustle Branding
// Creates optimized landing pages for each tour stop

const fs = require('fs');
const path = require('path');

// Tour Cities and Dates (update as needed)
const TOUR_STOPS = [
    { city: 'Boston', state: 'MA', date: 'March 21st', eventDate: '2026-03-21' },
    { city: 'New York', state: 'NY', date: 'April 18th', eventDate: '2026-04-18' },
    { city: 'Toronto', state: 'ON', date: 'May 1st-2nd', eventDate: '2026-05-01' },
    { city: 'Scottsdale', state: 'AZ', date: 'May 22nd-23rd', eventDate: '2026-05-22' },
    { city: 'Los Angeles', state: 'CA', date: 'June 19th-20th', eventDate: '2026-06-19' },
    { city: 'Dallas', state: 'TX', date: 'Nov 13th-14th', eventDate: '2026-11-13' },
    { city: 'Austin', state: 'TX', date: 'Dec 10th-11th', eventDate: '2026-12-10' },
    // Add remaining cities as they're confirmed
];

// City-specific customizations for higher conversion
const CITY_CUSTOMIZATIONS = {
    'New York': {
        urgencyText: 'In the city that never sleeps, opportunities move fast',
        heroAccent: 'Take that NYC hustle from the streets to the podcast booth',
        localRef: 'Manhattan venue',
        militaryConnection: 'Where Wall Street meets warrior mindset'
    },
    'Los Angeles': {
        urgencyText: 'In the entertainment capital, content is king',
        heroAccent: 'Turn your Hollywood dreams into podcast empire reality', 
        localRef: 'Premium LA venue',
        militaryConnection: 'Where veterans build media empires'
    },
    'Boston': {
        urgencyText: 'In the city of innovation and education',
        heroAccent: 'Revolutionary ideas meet revolutionary execution',
        localRef: 'Historic Boston venue',
        militaryConnection: 'Where American independence was born - now build yours'
    },
    'Dallas': {
        urgencyText: 'Everything is bigger in Texas, including opportunities',
        heroAccent: 'Texas-sized results from veteran-tested strategies',
        localRef: 'Premium Dallas venue',
        militaryConnection: 'Big D, bigger dreams, biggest results'
    },
    'Austin': {
        urgencyText: 'Keep Austin weird, but keep your profits real',
        heroAccent: 'Music City meets podcast mastery - veteran style',
        localRef: 'Live music capital venue',
        militaryConnection: 'Where creativity and discipline create wealth'
    },
    'Toronto': {
        urgencyText: 'The 6ix is ready for your success story',
        heroAccent: 'International opportunities with brotherhood execution',
        localRef: 'Downtown Toronto venue',
        militaryConnection: 'Cross-border success, veteran values'
    },
    'Scottsdale': {
        urgencyText: 'Desert luxury meets podcast mastery',
        heroAccent: 'Premium results in premium surroundings',
        localRef: 'Scottsdale luxury venue',
        militaryConnection: 'Where veterans level up to luxury lifestyle'
    }
};

function generateCityLandingPage(cityData) {
    console.log(`🔥 Generating LGH-branded landing page for ${cityData.city}, ${cityData.state}...`);
    
    // Read the updated template
    const templatePath = path.join(__dirname, 'trevor-podcast-tour-updated.html');
    let html = fs.readFileSync(templatePath, 'utf8');
    
    // Get city-specific customizations
    const customizations = CITY_CUSTOMIZATIONS[cityData.city] || {
        urgencyText: 'This opportunity won\'t wait',
        heroAccent: 'Turn your service into success',
        localRef: `${cityData.city} venue`,
        militaryConnection: 'Where veterans build wealth'
    };
    
    // City-specific replacements with LGH branding
    const replacements = {
        '[CITY]': cityData.city.toUpperCase(),
        '\\[CITY\\]': cityData.city,
        '[CITY NAME]': cityData.city,
        '[EVENT DATE]': cityData.date,
        '\\[EVENT_DATE_ISO\\]': `${cityData.eventDate}T18:30:00`,
        '\\[STATE\\]': cityData.state,
        'Premium downtown venue': customizations.localRef,
        'The Veteran Entrepreneur Who Helped 5,000\\+ Build Wealth Now Reveals His Podcast Monetization System': 
            `${customizations.heroAccent} - ${cityData.city} Exclusive Workshop`,
        'Trevor is only doing ONE workshop in \\[CITY\\] this year': 
            `Trevor is only doing ONE workshop in ${cityData.city} this year`,
        'Join Trevor Calais LIVE in \\[CITY\\]': 
            `Join Trevor Calais LIVE in ${cityData.city}`,
        'SECURE YOUR SEAT IN \\[CITY\\]': 
            `SECURE YOUR SEAT IN ${cityData.city}`,
        'GET \\[CITY\\] TICKETS': 
            `GET ${cityData.city} TICKETS`,
        'Miss this deployment, and you\'ll wait until 2027': 
            `Miss this deployment, and you'll wait until 2027... ${customizations.urgencyText}`
    };
    
    // Apply all replacements
    Object.keys(replacements).forEach(placeholder => {
        const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        html = html.replace(regex, replacements[placeholder]);
    });
    
    // Update meta tags for better SEO with LGH branding
    html = html.replace(
        /<title>.*?<\/title>/,
        `<title>Trevor Calais - Let's Geaux Hustle LIVE in ${cityData.city} - Podcast to Cash Workshop ${cityData.date}</title>`
    );
    
    html = html.replace(
        /<meta name="description" content=".*?">/,
        `<meta name="description" content="Join Trevor Calais from Let's Geaux Hustle LIVE in ${cityData.city} ${cityData.date}! The veteran entrepreneur who helped 5,000+ build wealth reveals his podcast monetization system.">`
    );
    
    // Update schema markup with LGH branding
    const schemaMarkup = `
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "Let's Geaux Hustle Presents: Podcast to Cash with Trevor Calais",
        "description": "The veteran entrepreneur behind Let's Geaux Hustle teaches his podcast monetization system live",
        "startDate": "${cityData.eventDate}T18:30:00",
        "endDate": "${cityData.eventDate}T21:30:00",
        "location": {
            "@type": "Place",
            "name": "${customizations.localRef}",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "${cityData.city}",
                "addressRegion": "${cityData.state}"
            }
        },
        "organizer": {
            "@type": "Person",
            "name": "Trevor Calais",
            "description": "U.S. Army Veteran, Entrepreneur, Founder of Let's Geaux Hustle",
            "url": "https://letsgeauxhustleworkshop.netlify.app"
        },
        "offers": [
            {
                "@type": "Offer",
                "name": "Basic Deployment",
                "price": "49",
                "priceCurrency": "USD",
                "url": "https://podcasttocashtour.com",
                "availability": "https://schema.org/LimitedAvailability"
            },
            {
                "@type": "Offer",
                "name": "VIP Command",
                "price": "99",
                "priceCurrency": "USD",
                "url": "https://podcasttocashtour.com",
                "availability": "https://schema.org/LimitedAvailability"
            }
        ]
    }
    </script>`;
    
    html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, schemaMarkup);
    
    // Save city-specific file
    const fileName = `lgh-podcast-tour-${cityData.city.toLowerCase().replace(/\s+/g, '-')}.html`;
    const outputPath = path.join(__dirname, 'lgh-tour-pages', fileName);
    
    // Create directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, html);
    
    console.log(`✅ Generated: ${fileName} (LGH Branded)`);
    
    return {
        city: cityData.city,
        fileName: fileName,
        path: outputPath,
        deployUrl: `https://lgh-podcast-tour.netlify.app/${fileName}`,
        branding: 'Let\'s Geaux Hustle Official'
    };
}

// Generate all city pages
function generateAllPages() {
    console.log('🚀 Generating LET\'S GEAUX HUSTLE Podcast Tour Landing Pages...\n');
    
    const generatedPages = [];
    
    TOUR_STOPS.forEach(cityData => {
        try {
            const pageData = generateCityLandingPage(cityData);
            generatedPages.push(pageData);
        } catch (error) {
            console.error(`❌ Error generating ${cityData.city} page:`, error.message);
        }
    });
    
    // Generate deployment summary
    const summary = {
        brand: 'Let\'s Geaux Hustle',
        founder: 'Trevor Calais - Veteran, Entrepreneur, One of you',
        credibility: '$10M+ Funded, 5,000+ Veterans Served',
        generated: generatedPages.length,
        pages: generatedPages,
        deploymentDate: new Date().toISOString(),
        tourStops: TOUR_STOPS.length,
        brandingUpdate: 'Aligned with letsgeauxhustleworkshop.netlify.app'
    };
    
    // Save deployment summary
    fs.writeFileSync(
        path.join(__dirname, 'lgh-tour-pages', 'deployment-summary.json'), 
        JSON.stringify(summary, null, 2)
    );
    
    console.log('\n📊 LET\'S GEAUX HUSTLE DEPLOYMENT SUMMARY:');
    console.log(`✅ Generated ${generatedPages.length} LGH-branded city-specific pages`);
    console.log(`🎖️ Veteran-focused messaging and military community trust`);
    console.log(`📁 Saved to: /lgh-tour-pages/`);
    console.log('\n🚀 NEXT STEPS:');
    console.log('1. Deploy pages to hosting (lgh-podcast-tour.netlify.app)');
    console.log('2. Set up veteran-focused Facebook/Google ads');
    console.log('3. Target military communities and veteran entrepreneurs');
    console.log('4. Leverage Let\'s Geaux Hustle email list and social media');
    
    return summary;
}

// Updated ad targeting data with veteran focus
function generateAdTargetingData() {
    const adData = TOUR_STOPS.map(stop => ({
        city: stop.city,
        state: stop.state,
        date: stop.date,
        landingPage: `lgh-podcast-tour-${stop.city.toLowerCase().replace(/\\s+/g, '-')}.html`,
        targeting: {
            location: `${stop.city}, ${stop.state}`,
            radius: '50 miles',
            interests: [
                'Podcasting',
                'Entrepreneurship', 
                'Military Veterans',
                'Veteran Business Owners',
                'Digital Marketing',
                'Online Business',
                'Content Creation',
                'Personal Branding',
                'Let\'s Geaux Hustle',
                'Military Transition'
            ],
            demographics: {
                age: '25-55',
                income: 'Top 30%',
                education: 'Some college+',
                military: 'Veterans and military families'
            },
            behaviors: [
                'Military veterans',
                'Small business owners',
                'Entrepreneurs',
                'Frequent podcast listeners'
            ]
        },
        adCopy: {
            headline: `${stop.city} Veterans: Podcast to Cash Workshop`,
            description: `Trevor from Let's Geaux Hustle reveals his $10M system LIVE in ${stop.city} ${stop.date}`,
            cta: `Get ${stop.city} Tickets - Veterans Only Event`,
            military_angle: 'From service to success - the veteran entrepreneur\'s podcast blueprint'
        },
        customization: CITY_CUSTOMIZATIONS[stop.city] || {}
    }));
    
    fs.writeFileSync(
        path.join(__dirname, 'lgh-tour-pages', 'veteran-ad-targeting.json'),
        JSON.stringify(adData, null, 2)
    );
    
    console.log('✅ Generated veteran-focused ad targeting data for all cities');
    return adData;
}

// Main execution
if (require.main === module) {
    const summary = generateAllPages();
    const adData = generateAdTargetingData();
    
    console.log('\n🔥 LET\'S GEAUX HUSTLE PODCAST TOUR DEPLOYMENT COMPLETE!');
    console.log(`📊 ${summary.generated} veteran-focused pages ready for high-converting ads`);
    console.log(`🎖️ "Veteran. Entrepreneur. One of you." - Trevor Calais`);
}

module.exports = {
    generateCityLandingPage,
    generateAllPages,
    generateAdTargetingData,
    TOUR_STOPS,
    CITY_CUSTOMIZATIONS
};