const ReviewCard = ({ author, content }: any) => {
  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 p-4 rounded-xl hover:scale-[1.02] transition">
      <h4 className="text-white text-sm mb-1">{author}</h4>
      <p className="text-gray-400 text-xs line-clamp-4">{content}</p>
    </div>
  );
};

export default ReviewCard;
