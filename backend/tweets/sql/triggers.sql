-- function to calculate the path of any given category
CREATE OR REPLACE FUNCTION _update_tweet_path() RETURNS TRIGGER AS
$$
BEGIN
    IF NEW.parent_id IS NULL THEN
        NEW.path = NEW.code::ltree;
    ELSE
        SELECT path || NEW.code
          FROM tweets_tweet
         WHERE NEW.parent_id IS NULL or tweet_id = NEW.parent_id
          INTO NEW.path;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- function to update the path of the descendants of a category
CREATE OR REPLACE FUNCTION _update_descendants_tweet_path() RETURNS TRIGGER AS
$$
BEGIN
    UPDATE tweets_tweet
       SET path = NEW.path || subpath(tweets_tweet.path, nlevel(OLD.path))
     WHERE tweets_tweet.path <@ OLD.path AND tweet_id != NEW.tweet_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- calculate the path every time we insert a new category
DROP TRIGGER IF EXISTS tweet_path_insert_trg ON tweets_tweet;
CREATE TRIGGER tweet_path_insert_trg
               BEFORE INSERT ON tweets_tweet
               FOR EACH ROW
               EXECUTE PROCEDURE _update_tweet_path();


-- calculate the path when updating the parent or the code
DROP TRIGGER IF EXISTS tweet_path_update_trg ON tweets_tweet;
CREATE TRIGGER tweet_path_update_trg
               BEFORE UPDATE ON tweets_tweet
               FOR EACH ROW
               WHEN (OLD.parent_id IS DISTINCT FROM NEW.parent_id
                     OR OLD.code IS DISTINCT FROM NEW.code)
               EXECUTE PROCEDURE _update_tweet_path();


-- if the path was updated, update the path of the descendants
DROP TRIGGER IF EXISTS tweet_path_after_trg ON tweets_tweet;
CREATE TRIGGER tweet_path_after_trg
               AFTER UPDATE ON tweets_tweet
               FOR EACH ROW
               WHEN (NEW.path IS DISTINCT FROM OLD.path)
               EXECUTE PROCEDURE _update_descendants_tweet_path();
