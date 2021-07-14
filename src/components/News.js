import { timeDifference } from "./../helpers/helper";
const News = ({ newsObj }) => {
  return (
    <a href={newsObj.url ? newsObj.url : ''}>
      <div className={`mb-6 text-xxs border text-gray-500 rounded-xl p-2 space-y-2 ${newsObj.url ? 'cursor-pointer' : ''}`}>
        <p className="">{newsObj.title}</p>
        {newsObj?.urlToImage && (
          <img
            src={newsObj.urlToImage}
            alt="news cover"
            className="rounded-xl"
          ></img>
        )}

        <div className="flex justify-between">
          <p>{newsObj?.source?.name}</p> <p>{newsObj?.author}</p>
        </div>
        <p className="text-gray-400">{timeDifference(newsObj.publishedAt)}</p>
      </div>
    </a>
  );
};

export default News;
