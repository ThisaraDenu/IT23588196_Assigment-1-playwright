const { test, expect } = require('@playwright/test');

// Configuration
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 5000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

// Test Data
const TEST_DATA = {
  positive: [
    {
      tcId: 'Pos_Fun_0001',
      name: 'Simple present tense - going to shop',
      input: 'mama kadee yanavaa.',
      expected: 'මම කඩේ යනවා.',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0002',
      name: 'Simple food request',
      input: 'mata bath kanna oonee.',
      expected: 'මට බත් කන්න ඕනේ.',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0003',
      name: 'Compound sentence with contradiction',
      input: 'mama gedhara yanavaa, namuth vaeda vaedhi nisaa yannee naee.',
      expected: 'මම ගෙදර යනවා, නමුත් වැඩ වැදි නිසා යන්නේ නෑ.',
      category: 'Daily language usage',
      grammar: 'Compound sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0004',
      name: 'Mixed English - Zoom meeting',
      input: 'Zoom meeting ekak thiyennee saha mama eekata log venavaa.',
      expected: 'Zoom meeting එකක් තියෙන්නේ සහ මම ඒකට log වෙනවා.',
      category: 'Mixed Singlish + English',
      grammar: 'Compound sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0005',
      name: 'Conditional sentence',
      input: 'oyaa enavaanam kiyanna mama balan innavaa.',
      expected: 'ඔයා එනවානම් කියන්න මම බලන් ඉන්නවා.',
      category: 'Daily language usage',
      grammar: 'Complex sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0006',
      name: 'Long paragraph about health and food',
      input: 'heta dhavasaka tharuNa parapura thaman gee sauKYAya gaena vaediya hithanna oonee. api nitharama hodha kaeema ganna purudhu venavaanam, anaagathayeedhi leda roogavalata godhuru venna thiyena idhakada godak adu vevi. ehema unoth janathaava bohoma nirogii dhavas kipayak gatha karavii saha eyaalagee aayu kaalaya thavath vaedi vevi kiyala mama hithanavaa. eya mulu ratatama mahath shakthiyak vevi.',
      expected: 'හෙට දවසක තරුණ පරපුර තමන් ගේ සෞඛ්‍යය ගැන වැඩිය හිතන්න ඕනේ. අපි නිතරම හොද කෑම ගන්න පුරුදු වෙනවානම්, අනාගතයේදි ලෙඩ රෝගවලට ගොදුරු වෙන්න තියෙන ඉදකඩ ගොඩක් අඩු වෙවි. එහෙම උනොත් ජනතාව බොහොම නිරොගී දවස් කිපයක් ගත කරවී සහ එයාලගේ ආයු කාලය තවත් වැඩි වෙවි කියල මම හිතනවා. එය මුලු රටටම මහත් ශක්තියක් වෙවි.',
      category: 'Daily language usage',
      grammar: 'Complex sentence',
      length: 'L'
    },
    {
      tcId: 'Pos_Fun_0007',
      name: 'Morning greeting',
      input: 'suBha udhaeesanak!',
      expected: 'සුභ උදෑසනක්!',
      category: 'Greeting / request / response',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0008',
      name: 'Greeting question - how are you all',
      input: 'kohomadha oyaala haemootama?',
      expected: 'කොහොමද ඔයාල හැමෝටම?',
      category: 'Greeting / request / response',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0009',
      name: 'Command - come immediately tomorrow',
      input: 'vahaama heta enna.',
      expected: 'වහාම හෙට එන්න.',
      category: 'Daily language usage',
      grammar: 'Imperative (command)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0010',
      name: 'Command - read properly',
      input: 'oyaa eeke okkoma hariyata kiyavalaa.',
      expected: 'ඔයා ඒකෙ ඔක්කොම හරියට කියවලා.',
      category: 'Daily language usage',
      grammar: 'Imperative (command)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0011',
      name: 'Past tense - went home yesterday',
      input: 'eyaala gedhara giyaa iiyee.',
      expected: 'එයාල ගෙදර ගියා ඊයේ.',
      category: 'Daily language usage',
      grammar: 'Past tense',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0012',
      name: 'Currency amount - Rs. 50000',
      input: 'Rs. 50000 mudhalak dhenna.',
      expected: 'Rs. 50000 මුදලක් දෙන්න.',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0013',
      name: 'Date mention - December 18 holiday',
      input: 'dhesaembar 18 nivaadu dhavasak.',
      expected: 'දෙසැම්බර් 18 නිවාඩු දවසක්.',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0014',
      name: 'Mixed English - TikTok video question',
      input: 'Facebook video ekak balamu neadha?',
      expected: 'Facebook video එකක් බලමු නේද?',
      category: 'Mixed Singlish + English',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0015',
      name: 'Long paragraph - cyclone damage report',
      input: 'dhitvaa suLi kuNaatuva samaGa aethi vuu gQQvathura saha naayayaeem heethuven maarga sQQvarDhana aDhikaariya sathu maarga kotas 330k vinaashayata pathva aethi athara, ehi samastha dhiga pramaaNaya kiloomiitar 300k pamaNa vana bava pravaahana, mahaamaarga saha naagarika sQQvarDhana amaathYA bimal rathnaayaka mahathaa saDHahan kaLeeya. meeya ratavee aarthikayata thadhin balapaa aetha.',
      expected: 'දිට්වා සුළි කුණාටුව සමඟ ඇති වූ ගංවතුර සහ නායයෑම් හේතුවෙන් මාර්ග සංවර්ධන අධිකාරිය සතු මාර්ග කොටස් 330ක් විනාශයට පත්ව ඇති අතර, එහි සමස්ත දිග ප්‍රමාණය කිලෝමීටර් 300ක් පමණ වන බව ප්‍රවාහන, මහාමාර්ග සහ නාගරික සංවර්ධන අමාත්‍ය බිමල් රත්නායක මහතා සඳහන් කළේය. මේය රටවේ ආර්තිකයට තදින් බලපා ඇත.',
      category: 'Daily language usage',
      grammar: 'Complex sentence',
      length: 'L'
    },
    {
      tcId: 'Pos_Fun_0016',
      name: 'Command - go forward',
      input: 'oyaa issarahata yanna.',
      expected: 'ඔයා ඉස්සරහට යන්න.',
      category: 'Daily language usage',
      grammar: 'Imperative (command)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0017',
      name: 'Future tense - talk later',
      input: 'api passe tikak kathaa karamu.',
      expected: 'අපි පස්සෙ ටිකක් කතා කරමු.',
      category: 'Daily language usage',
      grammar: 'Future tense',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0018',
      name: 'Present tense - going to temple',
      input: 'api pansal yanavaa.',
      expected: 'අපි පන්සල් යනවා.',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0019',
      name: 'Polite request question',
      input: 'karuNaakaralaa mata podi udhavvak karanna puLuvandha?',
      expected: 'කරුණාකරලා මට පොඩි උදව්වක් කරන්න පුළුවන්ද?',
      category: 'Greeting / request / response',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0020',
      name: 'Apology statement',
      input: 'samaavenna, eeka athvaeradhiimak.',
      expected: 'සමාවෙන්න, ඒක අත්වැරදීමක්.',
      category: 'Greeting / request / response',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0021',
      name: 'Mixed English - grandfather going to Colombo',
      input: 'siiyaa Colombo yanna hadhannee.',
      expected: 'සීයා Colombo යන්න හදන්නේ.',
      category: 'Names / places / common English words',
      grammar: 'Present tense',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0022',
      name: 'Present continuous - trying to go now',
      input: 'mama dhaen yanna hadhannee.',
      expected: 'මම දැන් යන්න හදන්නේ.',
      category: 'Daily language usage',
      grammar: 'Present tense',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0023',
      name: 'Question - are you all coming',
      input: 'oyaalaa enavadha?',
      expected: 'ඔයාලා එනවද?',
      category: 'Daily language usage',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0024',
      name: 'Multi-line conversation',
      input: 'mama gedhara yanavaa.\noyaa enavadha maath ekka yanna?',
      expected: 'මම ගෙදර යනවා.\nඔයා එනවද මාත් එක්ක යන්න?',
      category: 'Formatting (spaces / line breaks / paragraph)',
      grammar: 'Compound sentence',
      length: 'S'
    }
  ],
  
  negative: [
    {
      tcId: 'Neg_Fun_0001',
      name: 'Missing space - joined words',
      input: 'mamage dharayanavaa.',
      expected: 'මම ගෙදර යනවා.',
      category: 'Typographical error handling',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0002',
      name: 'Excessive punctuation - multiple question marks',
      input: 'oyaa gedhara yanavadha?????',
      expected: 'ඔයා ගෙදර යනවද?',
      category: 'Punctuation / numbers',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0003',
      name: 'Repeated words - api api api',
      input: 'api api api kadee yanavaa.',
      expected: 'අපි කඩේ යනවා.',
      category: 'Typographical error handling',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0004',
      name: 'Special character @ in sentence',
      input: 'mama heta @enava.',
      expected: 'මම හෙට එනවා.',
      category: 'Typographical error handling',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0005',
      name: 'HTML tags in input',
      input: '<b>gedhara<\/b>',
      expected: 'ගෙදර',
      category: 'Typographical error handling',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0006',
      name: 'Mixed special characters and numbers',
      input: 'oyaage Number eka 0771233568 neda? mata @gmail eken msg dhenna.',
      expected: 'ඔයාගෙ Number එක 0771233568 නේද? මට @gmail එකෙන් message දාන්න.',
      category: 'Mixed Singlish + English',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0007',
      name: 'Repeated words - nivaadu three times',
      input: 'nivaadu nivaadu nivaadu dhavasak heta thiyenne.',
      expected: 'නිවාඩු දවසක් හෙට තියෙන්නෙ.',
      category: 'Typographical error handling',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0008',
      name: 'Number in sentence - 1ta',
      input: 'mama 1ta yanavaa',
      expected: 'මම 1 ට යනවා',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0009',
      name: 'Very long run-on sentence',
      input: 'mama gedhra yanavaa namuth oyaa enna naha kiyala kiwwoth api monavadha karannee kiyala hariyata theerum ganna baha ehema vitharai naththam ehema kiyana ekath naha mama mehema kiwwa namuth ehema kiyala balaporoththu venna baha.',
      expected: 'මම ගෙදර යනවා නමුත් ඔයා එන්න නැහ කියල කිව්වොත් අපි මොනවද කරන්නේ කියල හරියට තේරුම් ගන්න බැහැ එහෙම විතරයි නැත්තම් එහෙම කියන එකත් නැහැ මම මෙහෙම කිව්ව නමුත් එහෙම කියල බලපොරොත්තු වෙන්න බැහැ.',
      category: 'Daily language usage',
      grammar: 'Complex sentence',
      length: 'L'
    },
    {
      tcId: 'Neg_Fun_0010',
      name: 'Word order variation',
      input: 'ada lectures yanavadha oyaa.',
      expected: 'අද lectures යනවද ඔයා.',
      category: 'Mixed Singlish + English',
      grammar: 'Interrogative (question)',
      length: 'S'
    }
  ],
  
  ui: {
    tcId: 'Pos_UI_0001',
    name: 'Real-time translation updates as typing',
    input: 'mama gedhara yanavaa. Oyaata puLuvandha enna maath ekka yanna. api maathara bus ekee yamu.',
    partialInput: 'mama gedhara',
    expectedFull: 'මම ගෙදර යනවා. ඔයාට පුළුවන්ද එන්න මාත් එක්ක යන්න. අපි මාතර bus එකේ යමු.',
    category: 'Usability flow',
    grammar: 'Compound sentence',
    length: 'M'
  }
};

// Helper Functions
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator('textarea') })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    await this.page.waitForFunction(
      () => {
        const elements = Array.from(
          document.querySelectorAll('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap')
        );
        const output = elements.find(el => {
          const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInputField && el.textContent && el.textContent.trim().length > 0;
        });
        return output !== undefined;
      },
      { timeout: 20000 }
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text.trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}

// Test Suite
test.describe('SwiftTranslator - Singlish to Sinhala Conversion Tests', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // Positive Functional Tests
  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // Negative Functional Tests
  test.describe('Negative Functional Tests', () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // UI Test
  test.describe('UI Functionality Tests', () => {
    test(`${TEST_DATA.ui.tcId} - ${TEST_DATA.ui.name}`, async ({ page }) => {
      const translator = new TranslatorPage(page);
      const input = await translator.getInputField();
      const output = await translator.getOutputField();

      await translator.clearAndWait();
      
      // Type partial input
      await input.pressSequentially(TEST_DATA.ui.partialInput, { delay: 150 });
      
      // Wait for partial output
      await page.waitForTimeout(1500);
      
      // Verify partial translation appears
      let outputText = await output.textContent();
      expect(outputText.trim().length).toBeGreaterThan(0);
      
      // Complete typing
      await input.pressSequentially(TEST_DATA.ui.input.substring(TEST_DATA.ui.partialInput.length), { delay: 150 });
      
      // Wait for full translation
      await translator.waitForOutput();
      
      // Verify full translation
      outputText = await translator.getOutputText();
      expect(outputText).toBe(TEST_DATA.ui.expectedFull);
      
      await page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  });
});