import { useContext, useState } from 'react';
import {
  dislikeArticle,
  favoriteArticle,
  undislikeArticle,
  unfavoriteArticle,
} from '../services/article.service';
import { Article } from '../models/article.model';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/auth.context';

interface Props {
  article: Article;
  isExtended?: boolean;
}

export default function FavoriteButton({ article, isExtended }: Props) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [count, setCount] = useState(article.favoritesCount);
  const [dislikesCount, setDislikesCount] = useState(article.dislikesCount);
  const [favorited, setFavorited] = useState(article.favorited);
  const [disliked, setDisliked] = useState(article.disliked);
  const [isLoading, setIsLoading] = useState(false);

  async function updateDislikeCount(): Promise<void> {
    if (!user) {
      navigate('/register');
    }

    setIsLoading(true);

    setDisliked(disliked => !disliked);

    if (disliked) {
      setDislikesCount(dislikesCount => dislikesCount - 1);
      await undislikeArticle(article.slug);
    } else {
      setDislikesCount(dislikesCount => dislikesCount + 1);
      await dislikeArticle(article.slug);
    }

    setIsLoading(false);
  }
  async function updateCount(): Promise<void> {
    if (!user) {
      navigate('/register');
    }

    setIsLoading(true);
    setFavorited(favorited => !favorited);

    if (favorited) {
      setCount(count => count - 1);
      await unfavoriteArticle(article.slug);
    } else {
      setCount(count => count + 1);
      await favoriteArticle(article.slug);
    }

    setIsLoading(false);
  }

  if (isExtended) {
    return (
      <button
        className={`btn btn-sm btn-${!favorited ? 'outline-' : ''}primary`}
        onClick={updateCount}
        disabled={isLoading}
      >
        <i className="ion-heart"></i> {favorited ? 'Unfavorite' : 'Favorite'} Article{' '}
        <span className="counter">({count})</span>
      </button>
    );
  } else {
    return (
      <>
        <button
          className={`btn btn-sm btn-${!disliked ? 'outline-' : ''}primary pull-xs-right`}
          onClick={updateDislikeCount}
          disabled={isLoading}
        >
          <i className="ion-thumbsdown"></i> {dislikesCount}
        </button>
        <button
          className={`btn btn-sm btn-${!favorited ? 'outline-' : ''}primary pull-xs-right`}
          onClick={updateCount}
          disabled={isLoading}
        >
          <i className="ion-heart"></i> {count}
        </button>
      </>
    );
  }
}
