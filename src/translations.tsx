import Link from './components/Link';
import { Order, PriceCategory } from './types';

export interface FormattedProperty {
  key: string;
  desired: boolean;
  name_en: string;
  name_fi: string;
  name_zh: string;
}

export const properties: FormattedProperty[] = [
  {
    desired: false,
    key: 'A+',
    name_en: 'contains allergens',
    name_fi: 'sisältää allergeeneja',
    name_zh: '包含过敏原',
  },
  {
    desired: false,
    key: 'C+',
    name_en: 'contains celery',
    name_fi: 'sisältää selleriä',
    name_zh: '包含芹菜',
  },
  {
    desired: true,
    key: 'E',
    name_en: 'egg-free',
    name_fi: 'ei sisällä kananmunaa',
    name_zh: '无蛋',
  },
  {
    key: 'G',
    desired: true,
    name_en: 'gluten-free',
    name_fi: 'gluteeniton',
    name_zh: '无麸质',
  },
  {
    desired: true,
    key: 'H',
    name_en: 'healthier choice',
    name_fi: 'terveellisempi valinta',
    name_zh: '健康优选',
  },
  {
    key: 'L',
    desired: true,
    name_en: 'lactose-free',
    name_fi: 'laktoositon',
    name_zh: '无乳糖',
  },
  {
    desired: true,
    key: 'LL',
    name_en: 'low in lactose',
    name_fi: 'vähälaktoosinen',
    name_zh: '低乳糖',
  },
  {
    desired: true,
    key: 'M',
    name_en: 'milk-free',
    name_fi: 'ei sisällä maitoa',
    name_zh: '无奶',
  },
  {
    desired: false,
    key: 'N+',
    name_en: 'contains nuts',
    name_fi: 'sisältää pähkinää',
    name_zh: '包含坚果',
  },
  {
    desired: false,
    key: 'O+',
    name_en: 'contains garlic',
    name_fi: 'sisältää valkosipulia',
    name_zh: '包含大蒜',
  },
  {
    desired: true,
    key: 'S',
    name_en: 'soy-free',
    name_fi: 'ei sisällä soijaa',
    name_zh: '无大豆',
  },
  {
    desired: false,
    key: 'S+',
    name_en: 'contains soy',
    name_fi: 'sisältää soijaa',
    name_zh: '包含大豆',
  },
  {
    key: 'V',
    desired: true,
    name_en: 'vegetarian',
    name_fi: 'vegetaarinen',
    name_zh: '素食 (蛋奶素)',
  },
  {
    key: 'VV',
    desired: true,
    name_en: 'vegan',
    name_fi: 'vegaani',
    name_zh: '纯素',
  },
];

export function getPropertyName(prop: FormattedProperty, lang: string): string {
  if (lang === 'fi') return prop.name_fi;
  if (lang === 'zh') return prop.name_zh;
  return prop.name_en;
}

export const priceCategorySettings = {
  [PriceCategory.student]: {
    fi: 'Näytetään vain ravintolat, jotka tarjoavat opiskelijahintaisen lounaan.',
    en: 'Only showing restaurants that provide student-priced lunches.',
    zh: '仅显示提供学生价午餐的餐厅。',
  },
  [PriceCategory.studentPremium]: {
    fi: 'Näytetään ravintolat, jotka tarjoavat mitä tahansa opiskelija-alennuksia.',
    en: 'Showing restaurants that provide any student discounts.',
    zh: '显示提供任何学生折扣的餐厅。',
  },
  [PriceCategory.regular]: {
    fi: 'Näytetään kaikki ravintolat.',
    en: 'Showing all restaurants.',
    zh: '显示所有餐厅（无折扣限制）。',
  },
};

const translations = {
  noMenu: {
    en: 'No menu available.',
    fi: 'Ruokalistaa ei ole saatavilla.',
    zh: '暂无菜单。',
  },
  restaurantClosed: {
    en: 'closed',
    fi: 'suljettu',
    zh: '已打烊',
  },
  termsOfService: {
    en: 'Terms Of Service',
    fi: 'Käyttöehdot',
    zh: '服务条款',
  },
  contact: {
    en: 'Contact',
    fi: 'Ota yhteyttä',
    zh: '联系我们',
  },
  settings: {
    en: 'Settings',
    fi: 'Asetukset',
    zh: '设置',
  },
  termsOfServiceContent: {
    en: (
      <div>
        <p>
          Kanttiinit retrieves all menu data directly from the restaurants, and
          isn&#39;t directly responsible for the correctness of any information.
          Please verify the information about allergens at the restaurants.
        </p>
        <p>Kanttiinit does not collect any identifiable user data.</p>
      </div>
    ),
    fi: (
      <div>
        <p>
          Kanttiinit hakee kaikki ruokalistat suoraan ravintoloiden sivuilta,
          eikä ole itse vastuussa tietojen paikkansapitävyydestä. Muista
          varmistaa ruokien allergeenit paikan päällä ravintolassa.
        </p>
        <p>Kanttiinit ei kerää mitään yksilöitävää käyttäjän dataa.</p>
      </div>
    ),
    zh: (
      <div>
        <p>
          Kanttiinit
          直接从各餐厅获取所有菜单数据，不对任何信息的准确性承担直接责任。请在餐厅现场确认关于食品及过敏原的信息。
        </p>
        <p>Kanttiinit 不收集任何可识别个人身份的用户数据。</p>
      </div>
    ),
  },
  thanksForFeedback: {
    fi: 'Kiitos palautteestasi!',
    en: 'Thank you for your feedback!',
    zh: '感谢您的反馈！',
  },
  email: {
    fi: 'Sähköposti',
    en: 'E-mail',
    zh: '电子邮箱',
  },
  message: {
    fi: 'Viesti',
    en: 'Message',
    zh: '反馈留言',
  },
  send: {
    fi: 'Lähetä',
    en: 'Send',
    zh: '发送',
  },
  sending: {
    fi: 'Lähetetään...',
    en: 'Sending...',
    zh: '正在发送...',
  },
  closed: {
    fi: 'suljettu',
    en: 'closed',
    zh: '已打烊',
  },
  useLocation: {
    fi: 'Käytä sijaintia',
    en: 'Use location',
    zh: '使用定位',
  },
  language: {
    fi: 'Kieli',
    en: 'Language',
    zh: '语言',
  },
  selectArea: {
    fi: 'Valitse alue',
    en: 'Select area',
    zh: '选择区域',
  },
  emptyRestaurants: {
    fi: 'Ei ravintoloita.',
    en: 'No restaurants.',
    zh: '暂无餐厅。',
  },
  starred: {
    fi: 'Tähdellä merkityt',
    en: 'Starred',
    zh: '已收藏',
  },
  nearby: {
    fi: 'Lähellä',
    en: 'Nearby',
    zh: '附近',
  },
  meters: {
    fi: 'metriä',
    en: 'meters',
    zh: '米',
  },
  kilometers: {
    fi: 'kilometriä',
    en: 'kilometers',
    zh: '公里',
  },
  closeModal: {
    fi: 'Sulje',
    en: 'Close',
    zh: '关闭',
  },
  favorites: {
    fi: 'Suosikit',
    en: 'Favorites',
    zh: '偏好',
  },
  order: {
    fi: 'Järjestys',
    en: 'Order',
    zh: '排序',
  },
  homepage: {
    fi: 'Kotisivu',
    en: 'Homepage',
    zh: '官方主页',
  },
  [Order.AUTOMATIC]: {
    fi: 'Automaattinen',
    en: 'Automatic',
    zh: '自动排序',
  },
  [Order.ALPHABET]: {
    fi: 'Aakkos',
    en: 'Alphabet',
    zh: '按字母顺序',
  },
  [Order.DISTANCE]: {
    fi: 'Etäisyys',
    en: 'Distance',
    zh: '按距离',
  },
  locating: {
    fi: 'Sijaintia haetaan...',
    en: 'Locating...',
    zh: '正在获取定位...',
  },
  turnOnLocation: {
    fi: () => (
      <span>
        Laita sijainti päälle <Link to="/settings">asetuksista.</Link>
      </span>
    ),
    en: () => (
      <span>
        Turn on location <Link to="/settings">in the settings.</Link>
      </span>
    ),
    zh: () => (
      <span>
        请在<Link to="/settings">设置</Link>中开启定位权限。
      </span>
    ),
  },
  reportDataTitle: {
    fi: 'Mikä tieto on väärin?',
    en: 'Which information is incorrect?',
    zh: '哪项信息有误？',
  },
  reportLabel: {
    fi: 'Mikä tieto on väärin?',
    en: 'What seems to be incorrect?',
    zh: '具体有误的信息：',
  },
  reportEmail: {
    fi: 'Sähköpostiosoitteesi (valinnainen)',
    en: 'Your e-mail address (optional)',
    zh: '您的电子邮箱（选填）',
  },
  report: {
    fi: 'Lähetä',
    en: 'Report',
    zh: '提交',
  },
  reporting: {
    fi: 'Lähetetään...',
    en: 'Reporting...',
    zh: '正在提交...',
  },
  otherClients: {
    fi: 'Muut käyttöliittymät',
    en: 'Other clients',
    zh: '其他客户端',
  },
  error: {
    fi: 'Odottomaton virhe',
    en: 'Unexpected error',
    zh: '意外错误',
  },
  errorDetails: {
    fi: 'Tapahtui odottamaton virhe, joka on raportoitu kehjittäjille. Yritä myöhemmin uudestaan.',
    en: 'There was an unexcpected error which has been reported to the developers. Please try again later.',
    zh: '发生了意外错误，已报告给开发者。请稍后重试。',
  },
  updates: {
    fi: 'Uutiset',
    en: 'News',
    zh: '动态资讯',
  },
  avoidDiets: {
    fi: 'Himmennä',
    en: 'Dim',
    zh: '淡化排除',
  },
  highlightDiets: {
    fi: 'Korosta',
    en: 'Highlight',
    zh: '高亮显示',
  },
  prioritize: {
    fi: 'Priorisoi',
    en: 'prioritize',
    zh: '优先喜好',
  },
  offline: {
    fi: 'Ei verkkoyhteyttä.',
    en: 'You are currently offline.',
    zh: '您当前处于离线状态。',
  },
  theme: {
    fi: 'Teema',
    en: 'Theme',
    zh: '主题风格',
  },
  copyURLToClipboard: {
    fi: 'Kopioi linkki leikepöydälle',
    en: 'Copy link to clipboard',
    zh: '复制链接到剪贴板',
  },
  copyMenuToClipboard: {
    fi: 'Kopioi ruokalista leikepöydälle',
    en: 'Copy menu to clipboard',
    zh: '复制菜单到剪贴板',
  },
  shareURL: {
    fi: 'Jaa linkki',
    en: 'Share link',
    zh: '分享链接',
  },
  restaurantNotFound: {
    fi: 'Ravintolaa ei löytynyt.',
    en: 'Restaurant not found.',
    zh: '未找到该餐厅。',
  },
  menuTab: {
    en: 'Menu',
    fi: 'Ruokalista',
    zh: '菜单',
  },
  mapTab: {
    en: 'Map',
    fi: 'Kartta',
    zh: '地图',
  },
  assetsLoading: {
    fi: 'Ladataan...',
    en: 'Loading...',
    zh: '加载中...',
  },
  openingHours: {
    fi: 'Aukioloajat',
    en: 'Opening hours',
    zh: '营业时间',
  },
  somethingElse: {
    fi: 'Muu tieto',
    en: 'Something else',
    zh: '其他信息',
  },
  back: {
    fi: 'Takaisin',
    en: 'Back',
    zh: '返回',
  },
  copyFromPreviousDay: {
    fi: 'Kopioi edelliseltä päivältä',
    en: 'Copy from previous day',
    zh: '复制前一天内容',
  },
  fixRestaurantInformation: {
    fi: 'Ehdota tietojen korjausta ravintolalle %restaurantName%',
    en: 'Suggest a fix for %restaurantName%',
    zh: '为 %restaurantName% 纠错',
  },
  fixInfo: {
    fi: 'Korjaa tietoja',
    en: 'Fix info',
    zh: '修正信息',
  },
  location: {
    fi: 'Sijainti',
    en: 'Location',
    zh: '位置',
  },
  openingTime: {
    fi: 'aukeamisaika',
    en: 'opening time',
    zh: '营业时间',
  },
  closingTime: {
    fi: 'sulkemisaika',
    en: 'closing time',
    zh: '打烊时间',
  },
  address: {
    fi: 'Osoite',
    en: 'Address',
    zh: '地址',
  },
  default: {
    fi: 'Oletus',
    en: 'Default',
    zh: '跟随系统',
  },
  light: {
    fi: 'Vaalea',
    en: 'Light',
    zh: '浅色',
  },
  dark: {
    fi: 'Tumma',
    en: 'Dark',
    zh: '深色',
  },
  tosShort: {
    fi: (
      <>
        <p>
          Kanttiinit on palvelu, joka näyttää ruokalistat kootusti, mutta ei
          vastaa ravintoloiden toiminnasta. Ruokien sisältöä tai allergeeneja
          koskevaa palautetta varten ota yhteyttä suoraan ravintolaan.
        </p>
        <h3>Puuttuuko ravintola?</h3>
        <p>
          Kanttiinit on avoimen lähdekoodin projekti, joka sijaitsee osoitteessa{' '}
          <a href="https://github.com/Kanttiinit/kitchen">
            github.com/Kanttiinit/kitchen
          </a>
          . Jos osaat kirjoittaa hieman koodia, voit lisätä ravintolan itse
          noudattamalla README-tiedoston ohjeita. Löydät meidät myös{' '}
          <a href="https://t.me/kanttiinitfeedback">
            Kanttiinit Contributors -kanavalta Telegramista
          </a>
          , jossa voimme tarjota lisäapua.
        </p>
      </>
    ),
    en: (
      <>
        <p>
          Kanttiinit is a menu aggregator and doesn't operate any restaurants.
          For feedback about food contents or allergens, contact the restaurant
          directly.
        </p>
        <h3>Missing a restaurant?</h3>
        <p>
          Kanttiinit is an open-source project hosted at{' '}
          <a href="https://github.com/Kanttiinit/kitchen">
            github.com/Kanttiinit/kitchen
          </a>
          . If you're capable of writing a little bit of code, you should able
          to add a restaurant yourself by following the instructions in the
          README-file. You can also find us in the{' '}
          <a href="https://t.me/kanttiinitfeedback">
            Kanttiinit Contributors channel on Telegram
          </a>{' '}
          where we can provide additional assistance.
        </p>
      </>
    ),
    zh: (
      <>
        <p>
          Kanttiinit
          是一个聚合显示各校区餐厅菜单的开源服务平台，不直接运营任何餐厅。有关食品成分、口味或过敏原的反馈，请直接联系相应餐厅。
        </p>
        <h3>缺少餐厅？</h3>
        <p>
          Kanttiinit 是一个开源项目，代码仓库位于{' '}
          <a href="https://github.com/Kanttiinit/kitchen">
            github.com/Kanttiinit/kitchen
          </a>
          。如果您了解一些编程，可以遵循 README 说明自行添加抓取解析。您也可以在
          Telegram 上的{' '}
          <a href="https://t.me/kanttiinitfeedback">Kanttiinit 贡献者频道</a>{' '}
          联系开发团队获取支持。
        </p>
      </>
    ),
  },
  reportDisclaimer: {
    fi: 'Voit ehdottaa korjauksia aukioloaikoihin, sijaintiin ja muihin perustietoihin. Kanttiinit vain näyttää ruokalistat kootussa paikassa — emme vastaa ruokalistojen sisällöstä. Ota ruokaan liittyvissä asioissa yhteyttä suoraan ravintolaan.',
    en: "You can suggest corrections to opening hours, location, and other details. Kanttiinit is an aggregator — we don't control menu content. For that, contact the restaurant directly.",
    zh: '您可以建议修改营业时间、地理位置及其他基础信息。Kanttiinit 仅汇集显示菜单，不对菜单实际内容负责。涉及餐品问题请直接联系餐厅。',
  },
  continueButton: {
    fi: 'Jatka',
    en: 'Continue',
    zh: '继续',
  },
  priceCategory: {
    fi: 'Hintaluokka',
    en: 'Price Category',
    zh: '价格分类',
  },
  highlightOperator: {
    fi: 'Korosta ruokalajit jotka sisältävät',
    en: 'Highlight courses that contain',
    zh: '高亮包含以下特性的菜品',
  },
  and: {
    fi: 'Kaikki valinnat',
    en: 'All of the selected',
    zh: '满足全部选中项',
  },
  or: {
    fi: 'Mitkä tahansa valinnoista',
    en: 'Any of the selected',
    zh: '满足任意选中项',
  },
  [PriceCategory.student]: {
    fi: 'Opiskelijalounas',
    en: 'Student lunch',
    zh: '学生午餐',
  },
  [PriceCategory.studentPremium]: {
    fi: 'Opiskelija-ale',
    en: 'Student discount',
    zh: '学生优惠',
  },
  [PriceCategory.regular]: {
    fi: 'Ei alennuksia',
    en: 'No discounts',
    zh: '无折扣 / 原价',
  },
  map: {
    fi: 'Kartta',
    en: 'Map',
    zh: '地图',
  },
  allAreas: {
    fi: 'Kaikki alueet',
    en: 'All areas',
    zh: '全部区域',
  },
};

export default translations;
