# MiniBank

Demo Project For Briller 

# Functionalities 
<dl>
<dt>Login/Register</dt>
<dd>- Basic Username/Password</dd>
<dt>Create Account</dt>
<dd>- Choose account type</dd>
<dd>- Auto-deposit for 100 USD once account is created</dd>
<dt>View Accounts</dt>
<dd>- USD, MMK currency ( updated exchange rate from API ) </dd>
<dt>Transfer Money</dt>
<dd>- Instant Transfer - Additional Fee ( set 5% of Transfer amount) </dd>
<dt>Transaction History</dt>
<dt>Received notification once money is transferred, push from socket</dt>
<dt>Logout</dt>
</dl>

# Technologies
<dl>
<dt>NodeJS</dt>
<dd> - Authentication ( with JWT) </dd>
<dd> - Socket for real time notification </dd>
<dd> - API server - Express </dd>
<dd> - Mock Function to generate test data ( with Sequelize Seeder )</dd>
<dt>ReactJS</dt>
<dd> - Redux ( Redux Toolkit ) </dd>
<dd> - React-router </dd>
<dt>SQL database</dt>
<dd> - Used Sequelize ORM </dd>
<dt>Deployment on EC2 instance - provided by Brillar</dt>
</dl>
