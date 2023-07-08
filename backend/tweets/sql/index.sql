-- used when we access the path directly
CREATE INDEX tweets_tweet_path
          ON tweets_tweet
       USING btree(path);

-- used when we get descendants or ancestors
CREATE INDEX tweets_tweet_path_gist
          ON tweets_tweet
       USING GIST(path);
