const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

async function seedPages() {
  console.log('====================================================');
  console.log('🚀 [인천하이병원] 그누보드7 g7_pages 일괄 등록 시작');
  console.log('====================================================');

  const conn = await mysql.createConnection({
    host: process.env.CAFE24_DB_HOST,
    user: process.env.CAFE24_DB_USER,
    password: process.env.CAFE24_DB_PASSWORD,
    database: process.env.CAFE24_DB_NAME,
    charset: 'utf8mb4'
  });

  // 하드코딩된 59개 페이지 목록 (navigationData 기반 추출)
  const pages = [
    { category: 'about', slug: 'greeting', name: '병원장 인사말' },
    { category: 'about', slug: 'history', name: '병원 연혁' },
    { category: 'about', slug: 'vision', name: '미션 및 비전' },
    { category: 'about', slug: 'doctors', name: '의료진 소개' },
    { category: 'about', slug: 'equipment', name: '첨단 의료장비' },
    { category: 'about', slug: 'floor', name: '층별 안내' },
    { category: 'about', slug: 'location', name: '오시는 길' },
    { category: 'neurosurgery', slug: 'headache-dizziness', name: '두통·어지럼증 클리닉' },
    { category: 'neurosurgery', slug: 'dementia', name: '치매 클리닉' },
    { category: 'neurosurgery', slug: 'stroke', name: '뇌졸중(중풍) 클리닉' },
    { category: 'neurosurgery', slug: 'peripheral-neuropathy', name: '말초신경병 클리닉' },
    { category: 'spine', slug: 'cervical-disc', name: '목디스크 클리닉' },
    { category: 'spine', slug: 'lumbar-disc', name: '허리디스크 클리닉' },
    { category: 'spine', slug: 'spinal-stenosis', name: '척추관협착증 클리닉' },
    { category: 'spine', slug: 'spondylolisthesis', name: '척추전방전위증' },
    { category: 'spine', slug: 'non-surgical', name: '비수술 척추치료' },
    { category: 'knee-hip', slug: 'cartilage-injury', name: '반월상 연골판 손상' },
    { category: 'knee-hip', slug: 'cruciate-ligament', name: '십자인대 파열' },
    { category: 'knee-hip', slug: 'arthritis', name: '퇴행성 관절염' },
    { category: 'knee-hip', slug: 'artificial-joint', name: '인공관절 수술' },
    { category: 'knee-hip', slug: 'hip-fracture', name: '고관절 골절' },
    { category: 'knee-hip', slug: 'avascular-necrosis', name: '대퇴골두 무혈성 괴사' },
    { category: 'knee-hip', slug: 'sports-injury', name: '스포츠 손상' },
    { category: 'knee-hip', slug: 'rehabilitation', name: '수술 후 재활치료' },
    { category: 'shoulder', slug: 'rotator-cuff', name: '회전근개 파열' },
    { category: 'shoulder', slug: 'frozen-shoulder', name: '오십견(동결견)' },
    { category: 'shoulder', slug: 'calcific-tendinitis', name: '석회화 건염' },
    { category: 'shoulder', slug: 'habitual-dislocation', name: '습관성 탈구' },
    { category: 'shoulder', slug: 'impingement-syndrome', name: '어깨 충돌증후군' },
    { category: 'hand-foot', slug: 'carpal-tunnel', name: '수근관 증후군 (손목터널)' },
    { category: 'hand-foot', slug: 'trigger-finger', name: '방아쇠 수지' },
    { category: 'hand-foot', slug: 'plantar-fasciitis', name: '족저근막염' },
    { category: 'hand-foot', slug: 'hallux-valgus', name: '무지외반증' },
    { category: 'hand-foot', slug: 'ankle-sprain', name: '발목 인대 파열 (염좌)' },
    { category: 'surgery-general', slug: 'appendicitis', name: '충수염 (맹장염)' },
    { category: 'surgery-general', slug: 'hernia', name: '탈장 클리닉' },
    { category: 'surgery-general', slug: 'gallstone', name: '담석증 클리닉' },
    { category: 'surgery-general', slug: 'hemorrhoid', name: '항문질환 (치질)' },
    { category: 'surgery-general', slug: 'varicose-vein', name: '하지정맥류' },
    { category: 'surgery-general', slug: 'trauma', name: '외상 및 화상 치료' },
    { category: 'internal-medicine', slug: 'digestive', name: '소화기 클리닉' },
    { category: 'internal-medicine', slug: 'respiratory', name: '호흡기 클리닉' },
    { category: 'internal-medicine', slug: 'endocrine', name: '내분비 클리닉 (당뇨/갑상선)' },
    { category: 'internal-medicine', slug: 'cardiovascular', name: '순환기 클리닉 (고혈압)' },
    { category: 'internal-medicine', slug: 'endoscopy', name: '위/대장 내시경' },
    { category: 'checkup', slug: 'comprehensive', name: '종합 건강검진' },
    { category: 'checkup', slug: 'national', name: '국가 건강검진 (공단)' },
    { category: 'checkup', slug: 'workplace', name: '직장인/채용 검진' },
    { category: 'checkup', slug: 'cancer', name: '5대 암 검진' },
    { category: 'checkup', slug: 'process', name: '검진 안내 및 절차' },
    { category: 'obgyn', slug: 'general', name: '일반 부인과 진료' },
    { category: 'obgyn', slug: 'menopause', name: '갱년기 클리닉' },
    { category: 'obgyn', slug: 'cervical-cancer', name: '자궁경부암 검진' },
    { category: 'obgyn', slug: 'vaccine', name: '자궁경부암 예방접종' },
    // 주메뉴 (허브페이지) 추가 (category 자체)
    { category: 'about', slug: '', name: '병원소개' },
    { category: 'neurosurgery', slug: '', name: '뇌신경센터' },
    { category: 'spine', slug: '', name: '척추센터' },
    { category: 'knee-hip', slug: '', name: '관절센터' },
    { category: 'shoulder', slug: '', name: '어깨관절' },
    { category: 'hand-foot', slug: '', name: '수·족부' },
    { category: 'surgery-general', slug: '', name: '외과진료' },
    { category: 'internal-medicine', slug: '', name: '내과진료' },
    { category: 'checkup', slug: '', name: '건강검진' },
    { category: 'obgyn', slug: '', name: '산부인과' },
    { category: 'community', slug: '', name: '커뮤니티' }
  ];

  console.log(`📂 생성 대상 페이지 수: ${pages.length}개`);
  
  let successCount = 0;
  for (const page of pages) {
    // slug 생성 규칙: 서브메뉴는 'category-slug', 주메뉴는 'category'
    const targetSlug = page.slug ? `${page.category}-${page.slug}` : page.category;
    const titleJson = JSON.stringify({ ko: page.name });
    
    // 내용(content)은 속도를 위해 빈 문자열로, content_mode는 json으로 세팅 (대전제)
    const emptyContent = "[]";

    try {
      // INSERT IGNORE를 통해 이미 존재하면 건너뛰거나, 혹은 그냥 INSERT ON DUPLICATE KEY UPDATE 활용
      await conn.execute(
        `INSERT INTO g7_pages (slug, title, content, content_mode, published, current_version, created_at, updated_at)
         VALUES (?, ?, ?, 'json', 1, 1, NOW(), NOW())
         ON DUPLICATE KEY UPDATE 
         title = VALUES(title), 
         published = 1,
         updated_at = NOW()`,
        [targetSlug, titleJson, emptyContent]
      );
      console.log(`   ➡️  등록 완료: [${page.name}] (slug: ${targetSlug})`);
      successCount++;
    } catch (err) {
      console.error(`   ❌ 등록 실패 [${page.name}]:`, err.message);
    }
  }

  console.log('====================================================');
  console.log(`🎉 성공적으로 ${successCount}개의 페이지가 g7_pages에 등록되었습니다!`);
  console.log('====================================================');
  
  await conn.end();
}

seedPages();
