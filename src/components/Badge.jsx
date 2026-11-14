function Badge({ color, children }) {
  const badgeStyle = {
    backgroundColor: color,
    color: 'white',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '700',
    display: 'inline-block',
  }

  return <span style={badgeStyle}>{children}</span>
}

export default Badge
