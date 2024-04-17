
## Interview Task Solutions

This repository contains solutions to three interview tasks: a math problem, web scraping Amazon for product reviews, and an SQL query to find addresses within a given distance.

---

### Task 1: Math Problem

**Problem Statement**

You are forming a team for which you have 50 participants, and it is necessary for each of them to have a private conversation (get to know) all the other participants. Each meeting lasts 20 minutes, and you have 10 separate rooms available. What is the minimum time required for all participants to meet?

**Solution**

The solution involves calculating the total number of meetings required and dividing it by the number of available rooms to determine the minimum time required.

**Implementation**

The solution is implemented in a JavaScript function `minimumTimeForMeetings()`. Example usage is provided in the file `mathTask/index.js`.

---

### Task 2: Amazon Web Scraping

**Problem Statement**

Given a product name, scrape Amazon to find the top reviews for the best-selling item matching that name.

**Solution**

The solution involves using Axios for HTTP requests and Cheerio for web scraping. The script searches for the given product, identifies the best-selling item, and retrieves its top reviews.

**Implementation**

The solution is implemented in a JavaScript function `searchAmazon()`. Example usage is provided in the file `amazonScraping/index.js`.

---

### Task 3: SQL Query for Distance

**Problem Statement**

Write an SQL query to find addresses within a given distance, considering the geometric features of the planet.

**Solution**

The solution involves implementing the Haversine formula in SQL to calculate distances between coordinates and filter addresses within the specified range.

**Implementation**

The SQL query is provided in the file `sql/find_addresses_within_distance.sql`. Sample data and test cases are included.