document.addEventListener('DOMContentLoaded', function() {
    // Sample event data (in a real app, this would come from a server)
    const events = [
        {
            id: 1,
            name: 'Rock Concert: The Rolling Stones',
            type: 'concert',
            date: '2025-05-15',
            time: '20:00',
            location: 'new-york',
            venue: 'Madison Square Garden',
            price: 120,
            description: 'Experience the legendary Rolling Stones live in concert as they perform their greatest hits.',
            featured: true,
            image: 'Rk con.jpeg'
        },
        {
            id: 2,
            name: 'Avengers: Final Chapter',
            type: 'movie',
            date: '2025-05-10',
            time: '18:30',
            location: 'los-angeles',
            venue: 'AMC Theaters',
            price: 15,
            description: 'The epic conclusion to the Avengers saga. Don\'t miss the most anticipated movie of the year!',
            featured: true,
            image: 'AEnd.jpeg'
        },
        {
            id: 3,
            name: 'Hamilton: The Musical',
            type: 'theater',
            date: '2025-05-20',
            time: '19:00',
            location: 'chicago',
            venue: 'Chicago Theater',
            price: 85,
            description: 'The Tony Award-winning musical about Alexander Hamilton, one of America\'s founding fathers.',
            featured: true,
            image: 'theater.jpg'
        },
        {
            id: 4,
            name: 'NBA Finals: Lakers vs Bulls',
            type: 'sports',
            date: '2025-06-05',
            time: '19:30',
            location: 'los-angeles',
            venue: 'Staples Center',
            price: 200,
            description: 'Watch the Los Angeles Lakers take on the Chicago Bulls in this exciting NBA Finals match.',
            featured: false,
            image: 'sports.jpg'
        },
        {
            id: 5,
            name: 'Jazz Festival',
            type: 'concert',
            date: '2025-05-25',
            time: '16:00',
            location: 'new-york',
            venue: 'Central Park',
            price: 75,
            description: 'A day of amazing jazz performances featuring top artists from around the world.',
            featured: true,
            image: 'jazz.jpg'
        },
        {
            id: 6,
            name: 'Opera: La Traviata',
            type: 'theater',
            date: '2025-05-18',
            time: '20:00',
            location: 'chicago',
            venue: 'Lyric Opera House',
            price: 110,
            description: 'Giuseppe Verdi\'s classic opera performed by a world-class company of singers and musicians.',
            featured: false,
            image: 'opera.jpg'
        },
        {
            id: 7,
            name: 'Comedy Night: Stand-Up Showcase',
            type: 'theater',
            date: '2025-05-22',
            time: '21:00',
            location: 'new-york',
            venue: 'Comedy Cellar',
            price: 45,
            description: 'Laugh the night away with performances from top stand-up comedians.',
            featured: false,
            image: 'comedy.jpg'
        },
        {
            id: 8,
            name: 'Electronic Music Festival',
            type: 'concert',
            date: '2025-06-10',
            time: '18:00',
            location: 'miami',
            venue: 'Bayfront Park',
            price: 95,
            description: 'Three days of electronic music featuring world-famous DJs and incredible light shows.',
            featured: true,
            image: 'electronic.jpg'
        },
        {
            id: 9,
            name: 'MLB: Yankees vs Red Sox',
            type: 'sports',
            date: '2025-05-30',
            time: '19:00',
            location: 'new-york',
            venue: 'Yankee Stadium',
            price: 80,
            description: 'The classic rivalry continues as the Yankees face off against the Red Sox.',
            featured: false,
            image: 'baseball.jpg'
        },
        {
            id: 10,
            name: 'Film Festival Opening Night',
            type: 'movie',
            date: '2025-06-15',
            time: '19:00',
            location: 'los-angeles',
            venue: 'Chinese Theatre',
            price: 50,
            description: 'Be among the first to see this year\'s most anticipated independent films.',
            featured: false,
            image: 'film-festival.jpg'
        }
    ];

    // Sample booking data (in a real app, this would come from a server)
    const bookings = [
        {
            id: 'TH-12345678',
            eventId: 1,
            date: '2025-05-15',
            time: '20:00',
            seats: ['A12', 'A13'],
            totalPrice: 240,
            status: 'upcoming'
        },
        {
            id: 'TH-87654321',
            eventId: 3,
            date: '2025-05-20',
            time: '19:00',
            seats: ['B5', 'B6', 'B7'],
            totalPrice: 255,
            status: 'upcoming'
        },
        {
            id: 'TH-23456789',
            eventId: 5,
            date: '2025-04-10',
            time: '16:00',
            seats: ['C9'],
            totalPrice: 75,
            status: 'past'
        }
    ];

    // User state (in a real app, this would be managed with proper authentication)
    let isLoggedIn = false;
    let currentUser = null;

    // DOM Elements - Common
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');

    // Initialize page-specific functionality
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === '' || currentPage === 'index.html') {
        initHomePage();
    } else if (currentPage === 'events.html') {
        initEventsPage();
    } else if (currentPage === 'booking.html') {
        initBookingPage();
    }

    // Common functionality
    function initCommon() {
        // Mobile menu toggle
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', function() {
                nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
            });
        }

        // Login modal
        if (loginBtn) {
            loginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                loginModal.style.display = 'flex';
            });
        }

        // Close modals
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                modal.style.display = 'none';
            });
        });

        // Tab switching
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active tab button
                document.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                // Show active tab content
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                });
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });

        // Login form submission
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simulate login (in a real app, this would validate with a server)
                const email = document.getElementById('login-email').value;
                isLoggedIn = true;
                currentUser = {
                    email: email,
                    name: email.split('@')[0]
                };
                
                loginModal.style.display = 'none';
                loginBtn.textContent = `Hi, ${currentUser.name}`;
                
                // Update UI for logged in user
                updateLoggedInUI();
            });
        }

        // Register form submission
        if (registerForm) {
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simulate registration (in a real app, this would send data to a server)
                const email = document.getElementById('register-email').value;
                const name = document.getElementById('register-name').value;
                
                isLoggedIn = true;
                currentUser = {
                    email: email,
                    name: name
                };
                
                loginModal.style.display = 'none';
                loginBtn.textContent = `Hi, ${currentUser.name}`;
                
                // Update UI for logged in user
                updateLoggedInUI();
            });
        }

        // Newsletter form submission
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            });
        }
    }

    // Update UI for logged in user
    function updateLoggedInUI() {
        // This would update various parts of the UI based on login state
        if (currentPage === 'booking.html') {
            const loginPrompt = document.getElementById('bookings-login-prompt');
            const noBookings = document.getElementById('no-bookings');
            const bookingsList = document.getElementById('bookings-list');
            
            if (loginPrompt) {
                loginPrompt.style.display = 'none';
            }
            
            // Display user's bookings
            displayUserBookings();
        }
    }

    // Home page functionality
    function initHomePage() {
        const featuredCarousel = document.getElementById('featured-carousel');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const quickSearchForm = document.getElementById('quick-search-form');
        const categoryCards = document.querySelectorAll('.category-card');
        
        // Populate featured events carousel
        if (featuredCarousel) {
            const featuredEvents = events.filter(event => event.featured);
            
            featuredEvents.forEach(event => {
                const carouselItem = document.createElement('div');
                carouselItem.className = 'carousel-item';
                
                carouselItem.innerHTML = `
                    <div class="carousel-img">Event Image</div>
                    <div class="carousel-content">
                        <h4>${event.name}</h4>
                        <p>${event.date} at ${event.time}</p>
                        <p>${event.venue}</p>
                        <p class="event-price">$${event.price}</p>
                        <a href="booking.html?event=${event.id}" class="btn-primary">Book Now</a>
                    </div>
                `;
                
                featuredCarousel.appendChild(carouselItem);
            });
            
            // Carousel navigation
            let position = 0;
            const itemWidth = document.querySelector('.carousel-item').offsetWidth + 32; // width + margin
            const itemCount = document.querySelectorAll('.carousel-item').length;
            
            prevBtn.addEventListener('click', function() {
                if (position > 0) {
                    position--;
                    updateCarouselPosition();
                }
            });
            
            nextBtn.addEventListener('click', function() {
                if (position < itemCount - 1) {
                    position++;
                    updateCarouselPosition();
                }
            });
            
            function updateCarouselPosition() {
                featuredCarousel.style.transform = `translateX(-${position * itemWidth}px)`;
            }
        }
        
        // Quick search form
        if (quickSearchForm) {
            quickSearchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const eventType = document.getElementById('event-type').value;
                const eventLocation = document.getElementById('event-location').value;
                const eventDate = document.getElementById('event-date').value;
                
                // Redirect to events page with search parameters
                let url = 'events.html';
                const params = [];
                
                if (eventType) params.push(`type=${eventType}`);
                if (eventLocation) params.push(`location=${eventLocation}`);
                if (eventDate) params.push(`date=${eventDate}`);
                
                if (params.length > 0) {
                    url += '?' + params.join('&');
                }
                
                window.location.href = url;
            });
        }
        
        // Category cards
        if (categoryCards.length > 0) {
            categoryCards.forEach(card => {
                card.addEventListener('click', function() {
                    const category = this.getAttribute('data-category');
                    window.location.href = `events.html?type=${category}`;
                });
            });
        }
        
        initCommon();
    }

    // Events page functionality
    function initEventsPage() {
        const filtersForm = document.getElementById('filters-form');
        const searchForm = document.getElementById('search-form');
        const eventsGrid = document.getElementById('events-grid');
        const eventsCount = document.getElementById('events-count');
        const sortBy = document.getElementById('sort-by');
        const pagination = document.getElementById('pagination');
        const filterToggleBtn = document.getElementById('filter-toggle-btn');
        const filtersContainer = document.getElementById('filters-container');
        const eventModal = document.getElementById('event-modal');
        const eventModalDetails = document.getElementById('event-modal-details');
        
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const typeParam = urlParams.get('type');
        const locationParam = urlParams.get('location');
        const dateParam = urlParams.get('date');
        
        // Set initial filter values from URL parameters
        if (typeParam) {
            document.querySelectorAll('input[name="event-type"]').forEach(input => {
                if (input.value === typeParam) {
                    input.checked = true;
                }
            });
        }
        
        if (locationParam) {
            document.querySelectorAll('input[name="location"]').forEach(input => {
                if (input.value === locationParam) {
                    input.checked = true;
                }
            });
        }
        
        if (dateParam) {
            document.getElementById('date-from').value = dateParam;
        }
        
        // Filter toggle for mobile
        if (filterToggleBtn) {
            filterToggleBtn.addEventListener('click', function() {
                filtersContainer.classList.toggle('active');
            });
        }
        
        // Apply filters
        if (filtersForm) {
            filtersForm.addEventListener('submit', function(e) {
                e.preventDefault();
                applyFilters();
            });
        }
        
        // Search form
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                applyFilters();
            });
        }
        
        // Sort events
        if (sortBy) {
            sortBy.addEventListener('change', function() {
                applyFilters();
            });
        }
        
        // Apply filters and display events
        function applyFilters() {
            // Get filter values
            const selectedTypes = Array.from(document.querySelectorAll('input[name="event-type"]:checked')).map(input => input.value);
            const selectedLocations = Array.from(document.querySelectorAll('input[name="location"]:checked')).map(input => input.value);
            const dateFrom = document.getElementById('date-from').value;
            const dateTo = document.getElementById('date-to').value;
            const priceMin = parseInt(document.getElementById('price-min').value);
            const priceMax = parseInt(document.getElementById('price-max').value);
            const searchQuery = document.getElementById('search-query').value.toLowerCase();
            
            // Filter events
            let filteredEvents = events.filter(event => {
                // Filter by type
                if (selectedTypes.length > 0 && !selectedTypes.includes(event.type)) {
                    return false;
                }
                
                // Filter by location
                if (selectedLocations.length > 0 && !selectedLocations.includes(event.location)) {
                    return false;
                }
                
                // Filter by date range
                if (dateFrom && new Date(event.date) < new Date(dateFrom)) {
                    return false;
                }
                
                if (dateTo && new Date(event.date) > new Date(dateTo)) {
                    return false;
                }
                
                // Filter by price range
                if (event.price < priceMin || event.price > priceMax) {
                    return false;
                }
                
                // Filter by search query
                if (searchQuery && !event.name.toLowerCase().includes(searchQuery) && 
                    !event.venue.toLowerCase().includes(searchQuery) && 
                    !event.description.toLowerCase().includes(searchQuery)) {
                    return false;
                }
                
                return true;
            });
            
            // Sort events
            const sortValue = sortBy.value;
            
            switch (sortValue) {
                case 'date-asc':
                    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
                    break;
                case 'date-desc':
                    filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
                case 'price-asc':
                    filteredEvents.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    filteredEvents.sort((a, b) => b.price - a.price);
                    break;
                case 'name-asc':
                    filteredEvents.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-desc':
                    filteredEvents.sort((a, b) => b.name.localeCompare(a.name));
                    break;
            }
            
            // Display events
            displayEvents(filteredEvents);
        }
        
        // Display events
        function displayEvents(eventsToDisplay) {
            eventsGrid.innerHTML = '';
            eventsCount.textContent = eventsToDisplay.length;
            
            if (eventsToDisplay.length === 0) {
                eventsGrid.innerHTML = '<div class="no-events">No events found matching your criteria</div>';
                pagination.innerHTML = '';
                return;
            }
            
            // Display events
            eventsToDisplay.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.className = 'event-card';
                
                eventCard.innerHTML = `
                    <div class="event-image">Event Image</div>
                    <div class="event-info">
                        <h4>${event.name}</h4>
                        <p><i class="far fa-calendar-alt"></i> ${event.date} at ${event.time}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${event.venue}</p>
                        <p class="event-price">$${event.price}</p>
                        <div class="event-actions">
                            <button class="btn-secondary view-details" data-event-id="${event.id}">View Details</button>
                            <a href="booking.html?event=${event.id}" class="btn-primary">Book Now</a>
                        </div>
                    </div>
                `;
                
                eventsGrid.appendChild(eventCard);
            });
            
            // Add event listeners to view details buttons
            document.querySelectorAll('.view-details').forEach(button => {
                button.addEventListener('click', function() {
                    const eventId = parseInt(this.getAttribute('data-event-id'));
                    showEventDetails(eventId);
                });
            });
            
            // Create pagination
            createPagination(eventsToDisplay.length);
        }
        
        // Show event details in modal
        function showEventDetails(eventId) {
            const event = events.find(e => e.id === eventId);
            
            if (event) {
                eventModalDetails.innerHTML = `
                    <div class="event-modal-header">
                        <h3>${event.name}</h3>
                    </div>
                    <div class="event-modal-body">
                        <div class="event-modal-image">Event Image</div>
                        <div class="event-modal-info">
                            <p><strong>Date & Time:</strong> ${event.date} at ${event.time}</p>
                            <p><strong>Venue:</strong> ${event.venue}</p>
                            <p><strong>Price:</strong> $${event.price}</p>
                            <p><strong>Description:</strong> ${event.description}</p>
                        </div>
                        <div class="event-modal-actions">
                            <a href="booking.html?event=${event.id}" class="btn-primary">Book Now</a>
                        </div>
                    </div>
                `;
                
                eventModal.style.display = 'flex';
            }
        }
        
        // Create pagination
        function createPagination(totalItems) {
            const itemsPerPage = 9;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            
            pagination.innerHTML = '';
            
            for (let i = 1; i <= totalPages; i++) {
                const pageItem = document.createElement('div');
                pageItem.className = 'pagination-item';
                pageItem.textContent = i;
                
                if (i === 1) {
                    pageItem.classList.add('active');
                }
                
                pagination.appendChild(pageItem);
            }
        }
        
        // Initialize price range slider
        const priceMin = document.getElementById('price-min');
        const priceMax = document.getElementById('price-max');
        const priceMinValue = document.getElementById('price-min-value');
        const priceMaxValue = document.getElementById('price-max-value');
        
        if (priceMin && priceMax) {
            priceMin.addEventListener('input', function() {
                priceMinValue.textContent = '$' + this.value;
            });
            
            priceMax.addEventListener('input', function() {
                priceMaxValue.textContent = '$' + this.value;
            });
        }
        
        // Apply initial filters
        applyFilters();
        
        initCommon();
    }

    // Booking page functionality
    function initBookingPage() {
        const bookingTabs = document.querySelectorAll('.booking-tab');
        const bookingTabContents = document.querySelectorAll('.booking-tab-content');
        const steps = document.querySelectorAll('.step');
        const stepContents = document.querySelectorAll('.booking-step-content');
        const nextStepBtns = document.querySelectorAll('.next-step');
        const prevStepBtns = document.querySelectorAll('.prev-step');
        const faqItems = document.querySelectorAll('.faq-item');
        const loginPromptBtn = document.getElementById('login-prompt-btn');
        const viewBookingsBtn = document.getElementById('view-bookings');
        const paymentMethodTabs = document.querySelectorAll('.payment-method-tab');
        const paymentMethodContents = document.querySelectorAll('.payment-method-content');
        
        // Get event ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const eventId = urlParams.get('event');
        
        // If event ID is provided, show event details
        if (eventId) {
            const event = events.find(e => e.id === parseInt(eventId));
            
            if (event) {
                const selectedEventDetails = document.getElementById('selected-event-details');
                const noEventSelected = document.querySelector('.no-event-selected');
                
                if (selectedEventDetails && noEventSelected) {
                    noEventSelected.style.display = 'none';
                    
                    selectedEventDetails.innerHTML = `
                        <div class="selected-event-card">
                            <div class="selected-event-image">Event Image</div>
                            <div class="selected-event-info">
                                <h4>${event.name}</h4>
                                <p><i class="far fa-calendar-alt"></i> ${event.date} at ${event.time}</p>
                                <p><i class="fas fa-map-marker-alt"></i> ${event.venue}</p>
                                <p class="event-price">$${event.price}</p>
                                <p>${event.description}</p>
                            </div>
                        </div>
                    `;
                    
                    // Enable continue button
                    document.querySelector('.next-step[data-next="2"]').disabled = false;
                }
            }
        }
        
        // Booking tabs
        bookingTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active tab
                bookingTabs.forEach(tab => tab.classList.remove('active'));
                this.classList.add('active');
                
                // Show active tab content
                bookingTabContents.forEach(content => content.classList.remove('active'));
                document.getElementById(`${tabId}-content`).classList.add('active');
            });
        });
        
        // Next step buttons
        nextStepBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const nextStep = parseInt(this.getAttribute('data-next'));
                
                // Update active step
                steps.forEach(step => step.classList.remove('active'));
                document.querySelector(`.step[data-step="${nextStep}"]`).classList.add('active');
                
                // Show active step content
                stepContents.forEach(content => content.classList.remove('active'));
                document.getElementById(`step-${nextStep}-content`).classList.add('active');
                
                // If moving to step 2, generate seats
                if (nextStep === 2) {
                    generateSeats();
                }
                
                // If moving to step 4, update summary
                if (nextStep === 4) {
                    updatePaymentSummary();
                }
                
                // If moving to step 5, generate confirmation
                if (nextStep === 5) {
                    generateConfirmation();
                }
            });
        });
        
        // Previous step buttons
        prevStepBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const prevStep = parseInt(this.getAttribute('data-prev'));
                
                // Update active step
                steps.forEach(step => step.classList.remove('active'));
                document.querySelector(`.step[data-step="${prevStep}"]`).classList.add('active');
                
                // Show active step content
                stepContents.forEach(content => content.classList.remove('active'));
                document.getElementById(`step-${prevStep}-content`).classList.add('active');
            });
        });
        
        // Generate seats
        function generateSeats() {
            const seatMap = document.getElementById('seat-map');
            
            if (seatMap) {
                seatMap.innerHTML = '';
                
                // Generate 50 seats (5 rows of 10)
                for (let row = 0; row < 5; row++) {
                    for (let col = 0; col < 10; col++) {
                        const seat = document.createElement('div');
                        const seatNumber = String.fromCharCode(65 + row) + (col + 1);
                        
                        // Determine seat type
                        let seatType = 'economy';
                        if (row === 0) {
                            seatType = 'premium';
                        } else if (row === 1 || row === 2) {
                            seatType = 'standard';
                        }
                        
                        // Randomly mark some seats as unavailable
                        const isAvailable = Math.random() > 0.2;
                        
                        seat.className = `seat ${seatType}`;
                        seat.textContent = seatNumber;
                        seat.setAttribute('data-seat', seatNumber);
                        seat.setAttribute('data-type', seatType);
                        
                        if (!isAvailable) {
                            seat.classList.add('unavailable');
                        } else {
                            seat.addEventListener('click', function() {
                                if (!this.classList.contains('unavailable')) {
                                    this.classList.toggle('selected');
                                    updateSelectedSeats();
                                }
                            });
                        }
                        
                        seatMap.appendChild(seat);
                    }
                }
            }
        }
        
        // Update selected seats
        function updateSelectedSeats() {
            const selectedSeats = document.querySelectorAll('.seat.selected');
            const selectedSeatsList = document.getElementById('selected-seats-list');
            const totalAmount = document.getElementById('seat-selection-total-amount');
            const nextStepBtn = document.querySelector('.next-step[data-next="3"]');
            
            if (selectedSeatsList && totalAmount) {
                if (selectedSeats.length === 0) {
                    selectedSeatsList.innerHTML = '<p>No seats selected</p>';
                    totalAmount.textContent = '$0.00';
                    nextStepBtn.disabled = true;
                } else {
                    let html = '<ul class="selected-seats">';
                    let total = 0;
                    
                    selectedSeats.forEach(seat => {
                        const seatNumber = seat.getAttribute('data-seat');
                        const seatType = seat.getAttribute('data-type');
                        let price = 75; // Economy price
                        
                        if (seatType === 'premium') {
                            price = 150;
                        } else if (seatType === 'standard') {
                            price = 100;
                        }
                        
                        html += `<li>Seat ${seatNumber} (${seatType.charAt(0).toUpperCase() + seatType.slice(1)}) - $${price}</li>`;
                        total += price;
                    });
                    
                    html += '</ul>';
                    selectedSeatsList.innerHTML = html;
                    totalAmount.textContent = `$${total.toFixed(2)}`;
                    nextStepBtn.disabled = false;
                }
            }
        }
        
        // Update payment summary
        function updatePaymentSummary() {
            const selectedSeats = document.querySelectorAll('.seat.selected');
            const summaryEventName = document.getElementById('summary-event-name');
            const summaryEventDatetime = document.getElementById('summary-event-datetime');
            const summarySeats = document.getElementById('summary-seats');
            const summarySubtotal = document.getElementById('summary-subtotal');
            const summaryFee = document.getElementById('summary-fee');
            const summaryTotal = document.getElementById('summary-total');
            
            // Get event details
            let event;
            if (eventId) {
                event = events.find(e => e.id === parseInt(eventId));
            } else {
                // Default to first event if none selected
                event = events[0];
            }
            
            // Calculate totals
            let subtotal = 0;
            let seatsList = [];
            
            selectedSeats.forEach(seat => {
                const seatNumber = seat.getAttribute('data-seat');
                const seatType = seat.getAttribute('data-type');
                let price = 75; // Economy price
                
                if (seatType === 'premium') {
                    price = 150;
                } else if (seatType === 'standard') {
                    price = 100;
                }
                
                seatsList.push(seatNumber);
                subtotal += price;
            });
            
            const serviceFee = subtotal * 0.1; // 10% service fee
            const total = subtotal + serviceFee;
            
            // Update summary
            summaryEventName.textContent = event.name;
            summaryEventDatetime.textContent = `${event.date} at ${event.time}`;
            summarySeats.textContent = seatsList.join(', ');
            summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
            summaryFee.textContent = `$${serviceFee.toFixed(2)}`;
            summaryTotal.textContent = `$${total.toFixed(2)}`;
        }
        
        // Generate confirmation
        function generateConfirmation() {
            const confirmationDetails = document.getElementById('confirmation-details');
            const bookingReference = document.getElementById('booking-reference');
            
            // Generate random booking reference
            const reference = 'TH-' + Math.random().toString(36).substring(2, 10).toUpperCase();
            bookingReference.textContent = reference;
            
            // Get event details
            let event;
            if (eventId) {
                event = events.find(e => e.id === parseInt(eventId));
            } else {
                // Default to first event if none selected
                event = events[0];
            }
            
            // Get customer details
            const customerName = document.getElementById('customer-name').value;
            const customerEmail = document.getElementById('customer-email').value;
            
            // Get selected seats
            const selectedSeats = document.querySelectorAll('.seat.selected');
            let seatsList = [];
            let total = 0;
            
            selectedSeats.forEach(seat => {
                const seatNumber = seat.getAttribute('data-seat');
                const seatType = seat.getAttribute('data-type');
                let price = 75; // Economy price
                
                if (seatType === 'premium') {
                    price = 150;
                } else if (seatType === 'standard') {
                    price = 100;
                }
                
                seatsList.push(seatNumber);
                total += price;
            });
            
            const serviceFee = total * 0.1; // 10% service fee
            const grandTotal = total + serviceFee;
            
            // Update confirmation details
            confirmationDetails.innerHTML = `
                <div class="confirmation-item">
                    <span>Event:</span>
                    <span>${event.name}</span>
                </div>
                <div class="confirmation-item">
                    <span>Date & Time:</span>
                    <span>${event.date} at ${event.time}</span>
                </div>
                <div class="confirmation-item">
                    <span>Venue:</span>
                    <span>${event.venue}</span>
                </div>
                <div class="confirmation-item">
                    <span>Seats:</span>
                    <span>${seatsList.join(', ')}</span>
                </div>
                <div class="confirmation-item">
                    <span>Customer:</span>
                    <span>${customerName}</span>
                </div>
                <div class="confirmation-item">
                    <span>Email:</span>
                    <span>${customerEmail}</span>
                </div>
                <div class="confirmation-item">
                    <span>Total Amount:</span>
                    <span>$${grandTotal.toFixed(2)}</span>
                </div>
            `;
        }
        
        // Payment method tabs
        paymentMethodTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const methodId = this.getAttribute('data-method');
                
                // Update active tab
                paymentMethodTabs.forEach(tab => tab.classList.remove('active'));
                this.classList.add('active');
                
                // Show active content
                paymentMethodContents.forEach(content => content.classList.remove('active'));
                document.getElementById(`${methodId}-payment`).classList.add('active');
            });
        });
        
        // FAQ items
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                item.classList.toggle('active');
            });
        });
        
        // Login prompt button
        if (loginPromptBtn) {
            loginPromptBtn.addEventListener('click', function(e) {
                e.preventDefault();
                loginModal.style.display = 'flex';
            });
        }
        
        // View bookings button
        if (viewBookingsBtn) {
            viewBookingsBtn.addEventListener('click', function() {
                // Switch to My Bookings tab
                bookingTabs.forEach(tab => tab.classList.remove('active'));
                document.querySelector('.booking-tab[data-tab="my-bookings"]').classList.add('active');
                
                bookingTabContents.forEach(content => content.classList.remove('active'));
                document.getElementById('my-bookings-content').classList.add('active');
            });
        }
        
        // Display user bookings
        function displayUserBookings() {
            const bookingsList = document.getElementById('bookings-list');
            const noBookings = document.getElementById('no-bookings');
            
            if (bookingsList) {
                // Clear login prompt
                bookingsList.innerHTML = '';
                
                if (bookings.length === 0) {
                    noBookings.style.display = 'block';
                } else {
                    noBookings.style.display = 'none';
                    
                    bookings.forEach(booking => {
                        const event = events.find(e => e.id === booking.eventId);
                        
                        if (event) {
                            const bookingCard = document.createElement('div');
                            bookingCard.className = 'booking-card';
                            
                            bookingCard.innerHTML = `
                                <div class="booking-card-header">
                                    <h4>Booking #${booking.id}</h4>
                                    <div class="booking-status ${booking.status}">${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</div>
                                </div>
                                <div class="booking-card-body">
                                    <div class="booking-event-details">
                                        <div class="booking-event-image">Event Image</div>
                                        <div class="booking-event-info">
                                            <h4>${event.name}</h4>
                                            <p class="booking-info-item"><span>Date & Time:</span> ${booking.date} at ${booking.time}</p>
                                            <p class="booking-info-item"><span>Venue:</span> ${event.venue}</p>
                                            <p class="booking-info-item"><span>Seats:</span> ${booking.seats.join(', ')}</p>
                                            <p class="booking-info-item"><span>Total Price:</span> $${booking.totalPrice.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div class="booking-card-actions">
                                        <button class="btn-secondary">View Tickets</button>
                                        ${booking.status === 'upcoming' ? '<button class="btn-danger">Cancel Booking</button>' : ''}
                                    </div>
                                </div>
                            `;
                            
                            bookingsList.appendChild(bookingCard);
                        }
                    });
                }
            }
        }
        
        // Populate popular events
        const popularEvents = document.getElementById('popular-events');
        
        if (popularEvents) {
            const featuredEvents = events.filter(event => event.featured).slice(0, 3);
            
            featuredEvents.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.className = 'event-card';
                
                eventCard.innerHTML = `
                    <div class="event-image">Event Image</div>
                    <div class="event-info">
                        <h4>${event.name}</h4>
                        <p><i class="far fa-calendar-alt"></i> ${event.date} at ${event.time}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${event.venue}</p>
                        <p class="event-price">$${event.price}</p>
                        <button class="btn-primary select-event" data-event-id="${event.id}">Select Event</button>
                    </div>
                `;
                
                popularEvents.appendChild(eventCard);
            });
            
            // Add event listeners to select event buttons
            document.querySelectorAll('.select-event').forEach(button => {
                button.addEventListener('click', function() {
                    const eventId = parseInt(this.getAttribute('data-event-id'));
                    window.location.href = `booking.html?event=${eventId}`;
                });
            });
        }
        
        initCommon();
    }
});