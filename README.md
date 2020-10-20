# Project 2 - Analysing US Land fires between 2013 - 2017

https://datavisproject2.herokuapp.com/

For Project 2, our group decided to analyze wildfires in the US given the current situation on the West coast. As we started researching for data sets and potential visualization, we came across some incredible projects hosted on Kaggle, and soon we found ourselves swooning over Purple Air! By the end of the first working session, we had decided to analyze the land fires in the US for a period of 5 years spanning from 2013 to 2017. 

We cleaned the dataset using Python and SQL. Python was used primarily to leverage the str.split (split string) function to extract multiple fires causes out of a single column as it is comparatively harder to do in SQL.

After loading into PostgreSQL, we performed additional steps to cleanse the data, like grouping NULL, “Other/Undetermined”, and “Unknown” values into a single cause.
After cleansing was complete, we ran distinct value counts to create a data dictionary that would later be used to develop and test with the Flask API.

We hosted the PostgreSQL database and Flask app on Heroku so our team members could develop and test without having to rely on local variables and data.

Using API calls, our team created a range of visualizations that are hosted on our super cool interactive website. Even though it looks like it's on fire! And, the CSS behind it is a work of art!

We made an interactive Choropleth that fills in each state with a corresponding color gradient. The higher the fires, the darker the color. You can zoom in and out of the map and upon hovering, it will display the count of fires for the corresponding State in the top right corner. You can see that the West coast has significantly higher counts of fires than the East coast which could be a result of drought in certain areas. And the top 5 states with the highest land fires are Arizona, California, Montana, Oregon, and Minnesota. New Hampshire and Vermont did not have any reported fires and hence are excluded from the dataset.

Using Plotly JavaScript, we made an interactive pie chart that can be filtered by State and Year independently to show the split of causes between Natural, Undetermined, and Human. 2013 recorded the highest count of land fires of the 5 Years analyzed.

We also created an interactive Data table using Plotly JavaScript. Each selected column pops against the rest of the table. You can drag and reorder the columns within the table.

We built a GeoMap with marker cluster group (MCG) layers that can be filtered by Year to show the fires across the US and its territories. This map too has the zoom in and out functionality and it is pretty darn cool to watch the MCG dynamically change.

We built some more fun Plotly visualizations using our good old Jupyter notebooks and Python! We have a bar chart that shows the overall land fires by each State. We have a Bubble chart showing the land fires versus the longitude. The higher the longitude, the more the fires.

We also have a Stacked Bar chart that shows us the fires by State and month for each State. Interestingly, July tends to be the most fire heavy month as it is peak summer. Lastly, we have another Stacked Bar chart that shows us the fires by cause. Humans tend to cause the most land fires at 68%, followed by Undetermined 19% and Natural 13%.

On the website, we also have a fantastic tab that lists the phenomenal project team members with links to each of our GitHub profiles. The website footer has links to the Homepage, Team, and our GitHub repo for this project. Did you spot the tiny Torchy’s mascot on the tab title yet?

In closing, this project empowered us to use so many of the programming skills and techniques we learned over the past 5+ months. We used Excel, Python, Jupyter Notebook, PostgreSQL, Flask APIs, HTML, Bootstrap CSS, JavaScript, Plotly, Leaflet, Choropleth, Heroku, and a tremendous amount of TEAMWORK, patience, and troubleshooting. And gallons of coffee/tea! But mostly, it was the knowledge sharing amongst the team that made our project shine!

We are grateful for Bob, Kidus, and Kevin for their patience and guidance with our Heroku challenges.

#### Parting wise words:

A house you can rebuild; a bridge you can restring; a washed-out road you can fill in. But there is nothing you can do about a tree but mourn.
All forests in the world need to be given the same name so that people can understand that there is only one forest in the world and that every burning forest is his forest, no matter where in the world!
© 2020 Muskatweeters
