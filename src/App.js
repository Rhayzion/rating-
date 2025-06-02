import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaFrown, FaSmile, FaGrinStars, FaCheckCircle } from 'react-icons/fa';
import './App.css';

const RatingModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // Dynamic reaction based on rating
  const getReaction = (rating) => {
    if (rating <= 2) return { icon: <FaFrown className="reaction-icon" />, message: 'We’d love to improve.' };
    if (rating === 3) return { icon: <FaSmile className="reaction-icon" />, message: 'Thank you for your feedback.' };
    return { icon: <FaGrinStars className="reaction-icon" />, message: 'We appreciate your support.' };
  };

  const handleSubmit = () => {
    setIsOpen(false);
    setThankYouOpen(true);
    setTimeout(() => setThankYouOpen(false), 3000); // Auto-close thank-you modal after 3s
  };

  // Animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.4, duration: 0.3 } },
  };

  const reactionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const thankYouVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  const checkmarkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 15 } },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Header */}
              <h2 className="modal-header">Your Feedback Matters</h2>

              {/* Reaction Display */}
              <motion.div
                className="reaction-container"
                variants={reactionVariants}
                initial="hidden"
                animate={rating > 0 ? 'visible' : 'hidden'}
              >
                {rating > 0 && (
                  <>
                    <div className="reaction-icon">{getReaction(rating).icon}</div>
                    <p className="reaction-message">{getReaction(rating).message}</p>
                  </>
                )}
              </motion.div>

              {/* Star Rating */}
              <div className="star-container">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <motion.button
                      key={index}
                      className="star-button"
                      onClick={() => setRating(ratingValue)}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(rating)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaStar className={ratingValue <= (hover || rating) ? 'star-active' : 'star-inactive'} />
                    </motion.button>
                  );
                })}
              </div>

              {/* Submit Button */}
              <motion.button
                className="submit-button"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={rating === 0}
              >
                Submit Feedback
              </motion.button>

              {/* Close Button */}
              <button className="close-button" onClick={() => setIsOpen(false)}>
                <svg className="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {thankYouOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="thank-you-modal"
              variants={thankYouVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="checkmark-container"
                variants={checkmarkVariants}
                initial="hidden"
                animate="visible"
              >
                <FaCheckCircle className="checkmark-icon" />
              </motion.div>
              <h2 className="thank-you-header">Thanks for Your Feedback!</h2>
              <p className="thank-you-message">We value your input and will use it to improve.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <div className="app-container">
      <RatingModal />
    </div>
  );
}

export default App;