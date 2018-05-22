# node-express-mysql-promise
proper folder structure with Node, MySQL,Express,Joi and promises


# To start 
node index.js 
or 
NODE_ENV=test DB_USER=root DB_PASSWORD=mind@123 DB_IP=localhost DB_NAME=demo node index.js



# you need to create database with table name user.
CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `auth_token` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `invalid_login_attampts` int(100) DEFAULT NULL,
  `last_lock_out` varchar(255) DEFAULT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `loggedInOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `email_address` (`email_address`),
  ADD UNIQUE KEY `auth_token` (`auth_token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
  
  
  
  
  
  
  
  
  ##############################################################################################
  Starting with index.js
  All routes comes from route folder, Index file of each folder will help you.
  
  In routes you will learn Joi validations.
  Then move to
  
  # Controllers
  Nice promises and await functions.
  
  
  # Promises
  Common promises.
  
  #Service
  Database connection with the help of pool.
  common function for insert update delete with the help of promises and await.
  
  #Token
  In Utils folder you will find the token manager.
  
  
