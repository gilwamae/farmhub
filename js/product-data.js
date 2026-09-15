/* =========================================================
   FARMHUB - PRODUCT DATA
   =========================================================
   
   TEMPORARY FRONTEND DATA
   
   Later this information will come from:
   
   PHP API → MySQL Database
   
   ========================================================= */

const farmHubProducts = [

    /* =====================================================
       DAIRY
       ===================================================== */

    {
        id: 1,

        name: "Fresh Whole Milk",

        category: "dairy",

        categoryName: "Milk & Dairy",

        price: 120,

        unit: "1 litre",

        farmer: "Green Valley Farm",

        location: "Kiambu",

        rating: 4.8,

        reviews: 24,

        stock: 35,

        image: "../assets/images/products/fresh-milk.jpg",

        description:
            "Fresh whole milk sourced from a trusted farm and handled with care to maintain quality and freshness.",

        tags: [
            "Fresh",
            "Dairy"
        ]
    },


    {
        id: 2,

        name: "Farm Fresh Yogurt",

        category: "dairy",

        categoryName: "Milk & Dairy",

        price: 180,

        unit: "500 ml",

        farmer: "Highland Dairy Farm",

        location: "Limuru",

        rating: 4.7,

        reviews: 18,

        stock: 20,

        image: "../assets/images/products/yogurt.jpg",

        description:
            "Creamy farm-fresh yogurt made from quality milk and suitable for breakfast, snacks and family meals.",

        tags: [
            "Dairy",
            "Fresh"
        ]
    },


    /* =====================================================
       MEAT
       ===================================================== */

    {
        id: 3,

        name: "Fresh Beef",

        category: "meat",

        categoryName: "Meat & Poultry",

        price: 650,

        unit: "1 kg",

        farmer: "Sunrise Livestock Farm",

        location: "Nakuru",

        rating: 4.9,

        reviews: 31,

        stock: 18,

        image: "../assets/images/products/fresh-beef.jpg",

        description:
            "Quality beef supplied by a trusted livestock farmer. Suitable for a variety of family meals.",

        tags: [
            "Beef",
            "Fresh"
        ]
    },


    {
        id: 4,

        name: "Farm Chicken",

        category: "meat",

        categoryName: "Meat & Poultry",

        price: 850,

        unit: "Whole chicken",

        farmer: "Mwangaza Poultry Farm",

        location: "Kiambu",

        rating: 4.6,

        reviews: 16,

        stock: 12,

        image: "../assets/images/products/farm-chicken.jpg",

        description:
            "Farm-raised chicken supplied directly from a local poultry farmer.",

        tags: [
            "Poultry",
            "Fresh"
        ]
    },


    /* =====================================================
       EGGS
       ===================================================== */

    {
        id: 5,

        name: "Fresh Farm Eggs",

        category: "eggs",

        categoryName: "Eggs",

        price: 450,

        unit: "Tray of 30",

        farmer: "Mwangaza Poultry Farm",

        location: "Kiambu",

        rating: 4.9,

        reviews: 42,

        stock: 50,

        image: "../assets/images/products/farm-eggs.jpg",

        description:
            "Fresh eggs collected from a local poultry farm and prepared for delivery.",

        tags: [
            "Eggs",
            "Fresh"
        ]
    },


    /* =====================================================
       FRUITS
       ===================================================== */

    {
        id: 6,

        name: "Fresh Avocados",

        category: "fruits",

        categoryName: "Fruits",

        price: 250,

        unit: "1 kg",

        farmer: "Green Valley Farm",

        location: "Murang'a",

        rating: 4.7,

        reviews: 22,

        stock: 40,

        image: "../assets/images/products/avocados.jpg",

        description:
            "Fresh, ripe avocados supplied directly from a local farm.",

        tags: [
            "Fruit",
            "Fresh"
        ]
    },


    {
        id: 7,

        name: "Fresh Mangoes",

        category: "fruits",

        categoryName: "Fruits",

        price: 220,

        unit: "1 kg",

        farmer: "Sunrise Fruit Farm",

        location: "Makueni",

        rating: 4.8,

        reviews: 27,

        stock: 30,

        image: "../assets/images/products/mangoes.jpg",

        description:
            "Sweet and fresh mangoes sourced from a local fruit farmer.",

        tags: [
            "Fruit",
            "Fresh"
        ]
    },


    /* =====================================================
       VEGETABLES
       ===================================================== */

    {
        id: 8,

        name: "Fresh Tomatoes",

        category: "vegetables",

        categoryName: "Vegetables",

        price: 100,

        unit: "1 kg",

        farmer: "Fresh Fields Farm",

        location: "Nairobi",

        rating: 4.6,

        reviews: 19,

        stock: 60,

        image: "../assets/images/products/tomatoes.jpg",

        description:
            "Fresh farm-grown tomatoes suitable for everyday cooking.",

        tags: [
            "Vegetable",
            "Fresh"
        ]
    },


    {
        id: 9,

        name: "Fresh Sukuma Wiki",

        category: "vegetables",

        categoryName: "Vegetables",

        price: 70,

        unit: "Bundle",

        farmer: "Fresh Fields Farm",

        location: "Nairobi",

        rating: 4.5,

        reviews: 15,

        stock: 75,

        image: "../assets/images/products/sukuma-wiki.jpg",

        description:
            "Fresh leafy greens harvested from a local farm.",

        tags: [
            "Vegetable",
            "Fresh"
        ]
    },


    /* =====================================================
       GRAINS
       ===================================================== */

    {
        id: 10,

        name: "Premium Maize",

        category: "grains",

        categoryName: "Grains & Cereals",

        price: 180,

        unit: "1 kg",

        farmer: "Eastern Harvest Farm",

        location: "Machakos",

        rating: 4.5,

        reviews: 13,

        stock: 80,

        image: "../assets/images/products/maize.jpg",

        description:
            "Quality maize supplied by a local agricultural producer.",

        tags: [
            "Grain",
            "Staple"
        ]
    },


    /* =====================================================
       HONEY
       ===================================================== */

    {
        id: 11,

        name: "Pure Natural Honey",

        category: "honey",

        categoryName: "Honey",

        price: 750,

        unit: "500 g",

        farmer: "Golden Hive Farm",

        location: "Baringo",

        rating: 4.9,

        reviews: 37,

        stock: 25,

        image: "../assets/images/products/natural-honey.jpg",

        description:
            "Pure natural honey sourced from a local beekeeping farm.",

        tags: [
            "Honey",
            "Natural"
        ]
    },


    /* =====================================================
       CHEESE
       ===================================================== */

    {
        id: 12,

        name: "Farmhouse Cheese",

        category: "cheese",

        categoryName: "Cheese",

        price: 900,

        unit: "500 g",

        farmer: "Highland Dairy Farm",

        location: "Limuru",

        rating: 4.8,

        reviews: 21,

        stock: 15,

        image: "../assets/images/products/farm-cheese.jpg",

        description:
            "Farmhouse cheese produced from quality milk and prepared for customers who value fresh farm products.",

        tags: [
            "Cheese",
            "Dairy"
        ]
    }

];