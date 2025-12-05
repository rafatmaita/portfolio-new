'use client';

import { motion } from 'framer-motion';
import { InputProps } from '@/types';

export function Input({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
}: InputProps) {
  const baseInputStyles = `
    w-full px-4 py-3
    bg-black/50 backdrop-blur-sm
    border rounded-lg
    text-white placeholder-gray-500
    font-mono text-sm
    transition-all duration-300
    focus:outline-none
  `;

  const borderStyles = error
    ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.3)]'
    : 'border-white/10 focus:border-[#8B5CF6]/50 focus:shadow-[0_0_10px_rgba(139,92,246,0.2)]';

  const inputStyles = `${baseInputStyles} ${borderStyles}`;

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-mono text-gray-400"
      >
        <span className="text-[#8B5CF6]">$</span> {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          rows={5}
          className={`${inputStyles} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={inputStyles}
        />
      )}

      {error && (
        <motion.p
          className="mt-2 text-sm text-red-400 font-mono"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-red-500">error:</span> {error}
        </motion.p>
      )}
    </motion.div>
  );
}

export default Input;
