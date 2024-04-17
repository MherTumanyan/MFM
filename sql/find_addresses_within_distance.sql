-- Create the addresses table if it doesn't exist
CREATE TABLE IF NOT EXISTS addresses (
    address_id INTEGER PRIMARY KEY,
    address TEXT,
    latitude DOUBLE,
    longitude DOUBLE
);

-- Insert sample data into the addresses table
INSERT INTO addresses (address, latitude, longitude) VALUES
('Sample Address 1', 40.18111, 44.51361), -- Yerevan
('Sample Address 2', 40.7942, 43.84528), -- Gyumri
('Sample Address 3', 34.0522, -118.2437); -- Los Angeles

-- Create a temporary table to store debugging information
CREATE TEMPORARY TABLE IF NOT EXISTS temp_debug (
    debug_info TEXT
);

-- Debugging: Log the start of the procedure
INSERT INTO temp_debug (debug_info) VALUES ('Starting procedure');

-- Create a temporary table to store addresses within the specified distance
CREATE TEMPORARY TABLE IF NOT EXISTS temp_addresses (
    address TEXT,
    latitude DOUBLE,
    longitude DOUBLE
);

-- Insert matching addresses into the temporary table using the Haversine formula
INSERT INTO temp_addresses (address, latitude, longitude)
SELECT address, latitude, longitude
FROM addresses
WHERE (
    6371 * ACOS(
        COS(RADIANS(40.7942)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(43.84528)) +
        SIN(RADIANS(40.7942)) * SIN(RADIANS(latitude))
    )
) <= 200; 
-- distance between Yerevan to Los Angeles approximately equals 11600km
-- distance between Yerevan to Gyumri approximately equals 85km

-- Debugging: Log the completion of inserting addresses into the temporary table
INSERT INTO temp_debug (debug_info) VALUES ('Finished inserting addresses into temp_addresses');

-- Select debugging information
SELECT * FROM temp_debug;

-- Select addresses from the temporary table
SELECT * FROM temp_addresses;


/*
Here Haversine Formula is used:
The Haversine formula is used to calculate the great-circle distance between two points on a sphere given their longitudes and latitudes.
It's commonly used in geographical applications where distances between locations need to be calculated.
More info you can find here: https://en.wikipedia.org/wiki/Haversine_formula
*/
