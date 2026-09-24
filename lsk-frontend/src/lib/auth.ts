export const setToken = (token: string, memberData: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('member_info', JSON.stringify(memberData));
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

export const getMemberInfo = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('member_info');
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('member_info');
    window.location.href = '/';
  }
};

export const isAdmin = () => {
  const member = getMemberInfo();
  // 그누보드 최고관리자 레벨 보통 10
  return member && member.mb_level >= 10;
};
