"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Sun,
  Moon,
  ArrowRight,
  Phone,
  MapPin,
  Calendar,
  Clock,
  BookOpen,
  Linkedin,
  Instagram,
  Heart,
} from "lucide-react";

/* ---------------------------
   1. TYPES
   --------------------------- */

type PageName = "details" | "service";

type ThemeClasses = {
  bg: string;
  text: string;
  card: string;
  border: string;
  primaryText: string;
  accentText: string;
};

type Contact = {
  name: string;
  phone: string;
};

type Minister = {
  name: string;
  origin: string;
};

type GalleryImage = {
  id: number;
  url: string;
  filter?: string;
};

type Couple = {
  groom: string;
  bride: string;
  names: string;
};

type SectionSub = {
  subheader?: string;
  details: string | string[];
  translation?: string | string[] | null;
};


type Section = {
  header: string;
  anchor?: string | null;
  purpose?: string;
  subsections?: SectionSub[];
};

/* ---------------------------
   2. CONFIGURATION & MOCK DATA
   --------------------------- */

const COLORS = {
  primary: "#556B2F", // Olive Green
  accent: "#FFD700", // Gold
};

export const WEDDING_DATA: {
  couple: Couple;
  date: string;
  time: string;
  location: string;
  officiatingMinisters: Minister[];
  contacts: Contact[];
  howWeMet: { title: string; story: string };
  gallery: GalleryImage[];
} = {
  couple: {
    groom: "Ayobami Akorede",
    bride: "Oluwabunmi Fadekemi",
    names: "OA Affairs",
  },
  date: "Saturday, November 29, 2025",
  time: "10:00 AM Prompt",
  location: "GRACE BAPTIST CHURCH, AJANGBADI, LAGOS, 3-5, Usman Mogaji Street, Jakande Junction, Off Ilogbo Road, Ajangbadi, Lagos State",
  officiatingMinisters: [
    { name: "Rev Dr. M.A Adetunbi", origin: "Chairman Lagos East Baptist Conference and Lead Pastor, New Lagos Baptist Church, Surulere," },
    { name: "Rev. Oluwafemi V. Ajose", origin: "Grace Baptist Church, Ajangbadi" },
    { name: "Rev. Dr. Adedokun Joshua", origin: "Calvary Baptist Church, Ayetoro" },
    { name: "Rev. Dr. Adebayo Ademuyiwa", origin: "First Baptist Church, Festac" },
    { name: "Pastor Ope Rowland", origin: "MIV Word House, Ibadan" },
    { name: "Pastor Seun Ayoade", origin: "Glorious Generation Church" },
    { name: "Mrs Bola Ajose", origin: "Grace Baptist Church, Ajangbadi" },
    { name: "Mrs Elizabeth Shiyanbade", origin: "Grace Baptist Church, Ajangbadi" },
    { name: "Mrs Funmilola Agunloye", origin: "Grace Baptist Church, Ajangbadi" },
    { name: "The Glorious Choir", origin: "Grace Baptist Church, Ajangbadi" },
    { name: "Ushers", origin: "Grace Baptist Church, Ajangbadi" },


  ],
  contacts: [
    { name: "Femi", phone: "+234 810 404 8474" },
    { name: "Sunday", phone: "+234 813 839 9798" },
  ],
  howWeMet: {
    title: "Our Journey to Forever",
    story:
      "Our paths first crossed in 2012, during Ayobami’s final year at university. One of his predecessors in the evangelist subgroup phoned him with a simple request: a sister named Bunmi was coming for her post-UTME and needed help settling in. Ayobami arranged a place for her to stay in a sister’s room and made sure she was taken care of, even cooking meals for her. Unfortunately, Bunmi discovered that she couldn't write the exam because the registration had already closed, so her visit was short-lived. Yet that brief encounter, which neither of us thought much of at the time, turned out to be the quiet beginning of a journey we would later continue together.",
  },
  gallery: [
    { id: 1, url: "/AB2.jpg", filter: "saturate(1.5)" },
    { id: 2, url: "/AB3.jpg", filter: "grayscale(0.8)" },
    { id: 3, url: "/AB1.jpg", filter: "sepia(0.6)" },
    { id: 4, url: "/AB4.jpg", filter: "brightness(1.2)" },
    { id: 5, url: "/AB5.jpg", filter: "contrast(1.5)" },
  ],
};

const ORDER_OF_SERVICE_DATA: { sections: Section[]; photographyOrder: string[] } = {
  sections: [
    {
      header: "Processional Hymn (To God be the Glory/ Ogo ni F'oluwa)",
      anchor: "Music Director",
      subsections: [
        {
          subheader: "TO GOD BE THE GLORY/ OGO NI F’OLUWA",
          details: [
            "1. To God be the glory, Great things He hath done,",
            "So loved He the world that He gave us His Son,",
            "Who yielded His life an atonement for sin,",
            "And opened the life-gate that all may go in.",
            "",
            "CHORUS:",
            "Praise the Lord, praise the Lord,",
            "Let the earth hear His voice!",
            "Praise the Lord, praise the Lord,",
            "Let the people rejoice!",
            "O come to the Father",
            "Through Jesus the Son,",
            "And give Him the glory, great Things He hath done.",
            "",
            "2. O perfect redemption, the purchase of blood,",
            "To every believer the promise of God;",
            "The vilest offender who truly believes,",
            "That moment from Jesus a pardon receives. [Chorus]",
            "",
            "3. Great things He hath taught us, Great things He hath done,",
            "And great our rejoicing through Jesus the Son;",
            "But purer, and higher, and greater will be",
            "Our wonder, our transport, when Jesus we see. [Chorus]",
          ],
          translation: [
            "1. Ogo ni f’Oluwa, to se ohun nla;",
            "Ifelo mu k’o fun wa ni Omo Re,",
            "Eniti O f’emi Re lele fese wa,",
            "To si silekun iye sile fun wa.",
            "",
            "EGBE:",
            "Yin Oluwa, Yin Oluwa,",
            "F’Iyin fun Oluwa!",
            "Yin Oluwa, yin Oluwa,",
            "E yo ni waju Re!",
            "K’a to baba wa lo, L’oruko Jesu,",
            "Jek’a jo f’ogo fun Onise ’yanu.",
            "",
            "2. Irapada kikun, ti eje Re ra,",
            "F’enikeni t’ogba ileri Re gbo;",
            "Enit’o buruju boba le gbagbo,",
            "Lojukanna y’ori idari gba. [Egbe]",
            "",
            "3. O s’ohun nla fun wa, o da wa l’ola.",
            "Ayo wa di kikun ninu Omo Re;",
            "Ogo ati ewa Irapada yi",
            "Y’oya wa lenu ’gbat’a ba ri Jesu. [Egbe]",
          ],
        },
      ],
    },
    {
      header: "Call to Worship/Ipe si Isin",
      anchor: "Rev. Dr. Adedokun",
    },
    {
      header: "Hymn of Worship/Orin Iyin (All Hail the Power of Jesus)",
      anchor: "Music Director",
      subsections: [
        {
          subheader: "Taking of Vows",
          details: [
            "1. All hail the power of Jesus' Name!",
            "Let angels prostrate fall;", 
            "Bring forth the royal diadem,", 
            "And crown Him Lord of all,",
            "",
            "2. Crown Him, ye martyrs of our God,",
            "Who from His altar call;",
            "Extol the Stem of Jesse's Rod,",
            "And crown Him Lord of all",
            "",
            "3. Ye seed of Israel's chosen race,", 
            "Ye ransomed from the fall,",
            "Hail Him Who saves you by His grace,",
            "And crown Him Lord of all, Hail",
            "",
            "4.Sinners, whose love can ne'er forget,",
            "The wormwood and the gall,",
            "Go spread your trophies at His feet,",
            "And crown Him Lord of all,",
            "",
            "5.Let ev'ry kindred, ev'ry tribe,",
            "On this terrestrial ball,",
            "To Him all majesty ascribe,",
            "And crown Him Lord of all,",
            "",
            "6. O that with yonder sacred throng,",
            "We at His feet may fall,", 
            "We'll join the everlasting song,",
            "And crown Him Lord of all.",
          ],
          translation: [
            "1. Gbogbo aye, gbe Jesu ga.",
            "Angel’, e wole fun:",
            "E mu ade Oba Re wa,",
            "Se l’Oba awon oba.",
            "",
            "2 .Ese l’Oba eyin Martyr,",
            "Ti npe ni pepe Re:",
            "Gbe gbongbo igi Jese ga,",
            "Se l’Oba awon oba.",
            "",
            "3. Eyin iru omo Israel’,",
            "Ti a ti rapada;",
            "E ki Eni t’O gba yin la,",
            "Se l’Oba awon oba.",
            "",
            "4. Gbogbo eniyan elese",
            "Ranti ‘banuje yin;",
            "E te ‘kogun yin s’ese Re,",
            "Se l’Oba awon oba.",
            "",
            "5. Ki gbogbo orile ede,",
            "Ni gbogbo agbaye;",
            "Ki won ki, “Kabiyesile”",
            "Se l’Oba awon oba.",
            "",
            "6.A ba le pel’awon t’orun,",
            "Lati ma juba Re;",
            "K’a bale jo jumo korin,",
            "Se l’Oba awon oba.",
          ],
        },
      ],
    },
    {
      header: "Charge & Declaration/ErediIgbeyawo	",
      anchor: "Pastor Ope Rowland",
      subsections: [
        {
          details: [
            "Dearly beloved, we are assembled here in the presence of God and before this congregation to join Oluwabunmi Fadekemi and Ayobami Akorede in Holy Matrimony. ",
            "Marriage is a Holy Estate instituted by God and commended in the scripture as honorable to all who enter it lawfully and in true love. It was confirmed by Christ’s solemn words and hallowed by HIS presence at the marriage feast in Cannan of Galilee and it was declared by the great Apostle Paul as signifying the mystical Union between Christ and HIS Church.Let angels prostrate fall;", 
            "Therefore, it ought not to be entered into lightly, unadvisedly but thoughtfully, reverently, discreetly, soberly and in the fear of God, duly considering the causes for which it was ordained. First marriage was ordained for companionship, mutual society, help and comfort which husband and wife ought to have for each other, in all circumstances.", 
            "Secondly, marriage was ordained for protection against sin, for avoidance of all sexual immoralities such as fornication that such person as have not the rare gift of celibacy might marry and keep themselves undefiled members of Christ’s body.",
            "Thirdly, marriage was ordained for procreation of children to be brought up and nurtured in the fear of the Lord and to the praise of HIS Holy Name. Into this Estate of marriage, Oluwabunmi Fadekemi and Ayobami Akorede come now to be joined.",
            "Therefore, if anyone can show any just cause why they may not lawfully be joined together in marriage…… Let him now declare it…….. Or else here after hold his peace.",
          ],
          translation: null,
        },
      ],
    },
    {
      header: "Hymn of Blessing/Orin Ibukun (Ojo Ibukun)",
      anchor: "Music Director",
      subsections: [
        {
          subheader: "Showers of Blessings / Ojo Ibukun",
          details: [
            "1. There shall be showers of blessing:",
            "This is the promise of love;",
            "There shall be seasons refreshing,",
            "Sent from the Savior above.",
            "",
            "REFRAIN:",
            "Showers of blessing,",
            "Showers of blessing we need:",
            "Mercy-drops round us are falling,",
            "But for the showers we plead.",
            "",
            "2. There shall be showers of blessing,",
            "Precious reviving again;",
            "Over the hills and the valleys,",
            "Sound of abundance of rain. [Refrain]",
            "",
            "3.There shall be showers of blessing:",
            "Send them upon us, O Lord;",
            "Grant to us now a refreshing,",
            "Come and now honor Thy Word. [Refrain]",
            "",
            "4.There shall be showers of blessing:",
            "Oh, that today they might fall,",
            "Now as to God we're confessing,",
            "Now as on Jesus we call! [Refrain]",
          ],
          translation: [
            "1. Ojo ibukun yio siro!”",
            "Eyi n’ ileri ife;",
            "A o ni itura didun",
            "Lat’ odo Olugbala",
            "",
            "EGBE:",
            "Ojo ibukun!",
            "Ojo ibukun l’ a nfe;",
            "Iri anu wa yi wa ka,",
            "Sugbon ojo l’ a ntoro.",
            "",
            "2. “Ojo ibukun yio sir o!”",
            "Isoji iyebiye;",
            "Lori oke ojo mbo,",
            "Iro opo ojo mbo [Egbe]",
            "3. “Ojo ibukun yio siro!”",
            "Ran won si wa, Oluwa!",
            "Fun wa ni itura didun,",
            "Wa, f’ ola fun oro Re. [Egbe]",
            "",
            "4.“Ojo ibukun yio siro!”",
            "Nwon ‘ba je le wa loni!",
            "B’a ti njewo f’ Olorun wa,",
            "T’ a npe oruko Jesu, [Egbe]",

          ],
        },
      ],
    },
    {
      header: "Confession, Joining and Blessing/Ijewo, Idapoati Ibukun ",
      anchor: "Rev Oluwafemi V. Ajose",
      subsections: [
        {
          subheader: "CONFESSION",
          details: [
            "The Minister {shall say} Upon the Confession of your faith in Christ Jesus the Lord, now both of you OluwabunmiFadeke and Ayobami Akoredeshall renounce all ancestral covenant and ancestral curses that can militate against the will of God for your life.",
          ],
          translation: null,
        },
        {
          subheader: "THE MAN WILL HOLD THE BIBLE",
          details: [
            "I, Ayobami Akorede with my knowledge about my new way of life and new creature in Christ Jesus that I am partaker in the blessing there in. I renounce all covenants, curses, generational covenants and oath. With my faith and assurance in Christ, I stand against divorce, separation, miscarriage, stillbirth, untimely death, lack of promotion, spiritual blindness, spiritual lukewarmness and any covenant and curse that may still be in my life in the name of Jesus {Amen}",
          ],
          translation: null,
        },
        {
          subheader: "THE WOMAN WILL HOLD THE BIBLE",
          details: [
            "I, Oluwabunmi Fadekemi with my knowledge about my new way of life and new creature in Christ Jesus that I am partaker in the blessing there in. I renounce all covenants, curses, generational covenants and oath. With my faith and assurance in Christ, I stand against divorce, separation, miscarriage, stillbirth, untimely death, lack of promotion, spiritual blindness, spiritual lukewarmness and any covenant and curse that may still be in my life in the name of Jesus {Amen}",
          ],
          translation: null,
        },
        {
          subheader: "JOINING AND BLESSING",
          details: [
            "I require and charge you both, as you will answer at the dreadful Day of Judgement, when secrets of all hearts shall be disclosed that if either of you know any impediment, why you may not be lawfully joined together in Holy matrimony, you should now confess it, for be you well assured that so many as are joined together otherwise than God’s word doth allow, are not joined together by God, neither is their matrimony lawful.",
            "GROOM:I, Ayobami Akoredehereby declare before God and his congregation that, I know not any lawful impediment why I may not be joined in the Holy Matrimony",
            "BRIDE:I, Oluwabunmi Fadekemihereby declare before God and his congregation that, I know not any lawful impediment why I may not be joined in the Holy Matrimony",
            "If no impediment be alleged, then shall the Minister say unto the man:",
            "MINISTER: Ayobami Akorede will thou have this woman to be thy wedded wife, to live together according to God’s law in the Holy Estate of Matrimony? Will thou love her, comfort her, honour her and keep her in all circumstances, forsake all others, keep thou only unto her, so long as you both shall live?",
            "GROOM: I will God helping me",
            "The Minister addresses the woman:",
            "MINISTER: Oluwabunmi Fadekemi will thou have this man to be thy wedded husband, to live together according to God’s law in the Holy Estate of Matrimony? Will thou obey him, serve him, keep him, love him and honour him in all all circumstances, forsake all others, keep thou only unto him, so long as you both shall live?",
            "BRIDE:I will God helping me. Amen",
            "The Minister will address the Father of the Bride: Who gave this woman to be married to this man?",
            "The Father will answer: I, Pa Moses Ogunbode and my wife on behalf of the entire family, gave her in marriage in the name of the Father, The Son and Holy Spirit.",
            "Here the father of the Bride takes her by the right hand, and hands her over to the Officiating Minister",
            "The Minister will quietly suggest that the man with his right hand take the right hand of the woman",
            "HUSBAND: I, Ayobami Adeagbo take theeOluwabunmi Fadekemi to be my wedded wife, to have and to hold, from this day forward, in all circumstances to love and to cherish, till Christ’s face we see according to God’s Holy Ordnance and hereto I pledge thee my truth.",
            "Then shall they lose their hands and the woman with the right hand taking the man by his right hand likewise say",
            "Wife: I,Oluwabunmi Fadekemi take thee Ayobami Akorede to be my wedded wife, to have and to hold, from this day forward, in all circumstances to love and to cherish, till Christ’s face we see according to God’s Holy Ordnance and hereto I pledge thee my truth.",
            "The minister will suggest that she hands her bouquet to the Chief Bride’s Maid, he will address the groom.",
          ],
          translation: null,
        },
        {
          subheader: "GIVING OF THE HOLY BIBLE",
          details: [
            "Ayobami Akorede, what is the symbol of the covenant you brought for your wife?",
            "MIINISTER: {2 Tim. 3:16-17} “All Scripture is God-breathed and is useful for teaching, rebuking, correction and training in righteousness. So that the man of God may be thoroughly equipped for every good work” {NIV}",
            "Bless this Bible O Lord and grant thy Children wisdom, and Grace to abide by the word of the truth in the name of the Father, The Son and of The Holy Spirit. Amen.",
            "Then, the Groom gives the Bride a new copy of the Holy Bible and hold it together.",
            "HUSBAND: With the Bible, which is word of God. I marry you. I surrender myself unto you in sacrifice and I will nurse you with all my possession in the name of the Father, The Son and of The Holy Spirit. Amen.",
            "WIFE: I accept the Bible, which is a symbol of our marriage, I surrender myself unto you in sacrifice and I will nurse you with all my possession in the name of the Father, The Son and of The Holy Spirit. Amen.",
          ],
          translation: null,
        },
        {
          subheader: "GIVING OF RINGS",
          details: [
            "Ayobami Akorede and Oluwabunmi Fadekemi what token of Love do you bring for each other?",
            "The Minister receiving the rings shall bless them saying.",
            "MINISTER: Bless O Lord these Rings which we bless in thy name and grant that they wear them may keep true faith unto each other and that they both may abide in",
            "Minister shall deliver the ring to the man and the man putting it in the fourth finger of the woman’s left hand saying",
            "HUSBAND: With this ring I wed thee, with my body; I love thee and all my worldly goods with thee I share in the name of the Father, The Son and of The Holy Spirit. Amen.",
            "Then the Minister shall deliver the ring to the woman and the woman putting it in the fourth finger of the man’s left hand",
            "WIFE: With this ring I wed thee, with my body; I honour thee and all my worldly goods with thee I share in the name of the Father, The Son and of The Holy Spirit. Amen.",
          ],
          translation: null,
        },
        {
          subheader: "BLESSING",
          details: [
            "The couples shall knee down, while the minister says:",
            "MINISTER: May God the Father, God the Son and God the Holy Spirit bless, preserve and keep you, may the Lord in His mercy with His favour look upon you to fill you with all spiritual benediction and grace that ye may live together in this life and the world to come, ye may have everlasting life. Amen.",
            "“The Lord will command His blessing upon you in your barns and all that you undertake; and He will bless you in the land which the Lord your God gives you”",
            "The Lord bless you and will keep you; the Lord make His face shine upon you and be gracious to you, the Lord lifts His countenance upon you and grant you peace, now and forever. Amen",
            "For as much as Ayobami Akorede and Oluwabunmi Fadekemi have consented in Holy wedlock and have witnessed the same before God and before this congregation, and thereto have given and pledge their covenant for each other and have declared the same the same by giving and receiving of the rings and by joining of hands. As minister of the Lord Jesus Christ, I pronounce and declare you husband and wife to be addressed as Mr and Mrs Ayobami Akorede Adeagboin the name of The Father, The Son and of The Holy Spirit. Amen.",
          ],
          translation: null,
        },
      ],
    },
    {
      header: "Hymn of Prayer/Orin Adua (Nipa Ife Olugbala)",
      anchor: "Music Director",
      subsections: [
        {
          subheader: "THROUGH THE LOVE OF GOD OUR SAVIOUR/ NIPA IFE OLUGBALA",
          details: [
           "1. Through the love of God our Saviour,",
           "All will be well;",
           "Free and changeless is His favour,",
           "All, all is well:",
           "Precious is the blood that heal'd us;",
           "Perfect is the grace that seal'd us;",
           "Strong the hand strech'd forth to shield us,",
           "All must be well.",
           "",
           "2. Thou we pass through tribulation,",
           "All will be well;",
           "Christ hath purchas'd full salvation,",
           "All, all is well;",
           "Happy still in God confiding;",
           "Fruitful, if in Christ abiding;",
           "Holy, through the Spirit's guiding,",
           "All must be well.",
           "",
           "3. We expect a bright tomorrow;",
           "All, will be well;",
           "Faith can sing through days of sorrow,",
           "All, all is well;",
           "On our Father's love relying,",
           "Jesus every need supplying,",
           "Then in living or in dying",
           "All must be well.",
           "Amen",

          ],
          translation: [
            "1. Nipa ife Olugbala,",
            "Ki y‘o si nkan;",
            "Oju rere Re ki pada,",
            "Ki y‘o si nkan;",
            "Owon l‘eje t‘o wo wa san;",
            "Pipe l‘edidi or‘ofe;",
            "Agbara l‘owo t‘o gba ni",
            "Ko le si nkan.",
            "",
            "2. Bi a wa ninu iponju,",
            "Ki y‘o si nkan;",
            "Igbala kikun ni tiwa,",
            "Ki y‘o si nkan,",
            "Igbekele Olorun dun;",
            "Gbigbe inu Kristi l‘ere,",
            "Emi si nso wa di mimo,",
            "Ko le si nkan.",
            "",
            "3. Ojo ola yio dara,",
            "Ki y‘o si nkan,",
            "‘Gbagbo le korin n‘nu ‘ponju",
            "Ki y‘o si nkan,",
            "Agbekele ‘fe Baba wa;",
            "Jesu nfun wa l‘ohun gbogbo" ,
            "Ni yiye tabi ni kiku;",
            "Ko le si nkan.",
            "Amin",
          ],
        },
      ],
    },
    {
      header: "Prayer of Dedication/Adura Iyasi",
      anchor: "Rev Dr. Adebayo",
    },
    {
      header: "Bible Reading/Bibeli Kika",
      anchor: "Mrs Bola Ajose",
    },
    {
      header: "Choir Rendition/Ise Iranse Orin",
      anchor: "The Glorious Choir",
    },
    {
      header: "Sermon/Iwasu",
      anchor: "Rev M.A. Adetumbi",
    },
    {
      header: "Signing of Marriage Register/Fifi owo si iwe eri Igbeyawo",
      anchor: "Rev Oluwafemi V. Ajose",
    },
    {
      header: "Marriage Thanksgiving/IdupeIgbeyawo",
      anchor: "Mrs Elizabeth Shiyanbade",
    },
    {
      header: "Presentation of Certificate/Fifun won niiweeri",
      anchor: "Rev Oluwafemi V. Ajose",
    },
    {
      header: "Greetings and Annoucement/IkiloatiIfilo",
      anchor: "Mrs Funmilola Agunloye",
    },
    {
      header: "Vote of Thanks/Oro Idupe",
      anchor: "Mrs Oluwaseun Afolabi",
    },
    {
      header: "Closing Prayer/Adura Ipari",
      anchor: "Pastor Seun Ayoade",
    },
    {
      header: "Benediction/Oore Ofe	",
      anchor: "Rev Dr. M.A Adetunbi",
    },
    {
      header: "Recessional Hymn/Orin Akojade (God give us Christain Home)",
      anchor: "Music Director",

      subsections: [
        {
          subheader: "GOD GIVE US CHRISTIAN HOME/ FUN WA N’LE ONIGBAGBO",
          details: [
           "1. God give us Christian homes",
           "Homes where the Bible is loved and taught",
           "Homes where the Master's will is sought",
           "Homes crowned with beauty Your love has wrought",
           "God give us Christian homes",
           "God give us Christian homes",
           "",
           "2. God give us Christian homes",
           "Homes where the father is true and strong",
           "Homes that are free from the blight of wrong",
           "Homes that are joyous with love and song",
           "God give us Christian homes",
           "God give us Christian homes",
           "",
           "3. God give us Christian homes",
           "Homes where the mother, in caring quest",
           "Strives to show others Your way is best",
           "Homes where the Lord is an honoured guest",
           "God give us Christian homes",
           "God give us Christian homes",
           "",
           "4. God give us Christian homes",
           "Homes where the children are led to know",
           "Christ in His beauty who loves them so",
           "Homes where the altar fires burn and glow",
           "God give us Christian homes",
           "God give us Christian homes!",

          ],
          translation: [
            "1. Fun wa n’le onigbagbo",
            "Ile ti a nkeko Bibeli",
            "Ile ti a nlepa ‘fe Baba",
            "Ta f’ewa ife re de lade",
            "Fun wa n’le Onigbagbo ",
            "Fun wa n’le Onigbagbo ",
            "",
            "2. Fun wa n’le Onigbagbo",
            "Nibi ti Baba j’olotito",
            "Ile t’o t’akete si ibi",
            "Ile t’o kun f’ayo ‘fe at’orin",
            "Fun wa n’le onigbagbo",
            "Fun wa n’le Onigbagbo",
            "",
            "3. Fun wa n’le Onigbagbo",
            "‘le t’iya nsise b’oba obinrin",
            "Fihan p’ona re lo dara ju",
            "Ile ti ngba Jesu l’alejo",
            "Fun wa n’le Onigbagbo",
            "Fun wa n’le Onigbagbo",
            "",
            "4. Fun wa n’le onigbagbo",
            "Ni’bi ti an nto awon omode",
            "L’ati mo Kristi t’o feran won",
            "Ile t’ina adura tin jo",
            "Fun wa n’le onigbagbo",
            "Fun wa n’le Onigbagbo",
          ],
        },
      ],
    },
    {
      header: "Our Note: OA Affairs",
      subsections: [
        {
          details: [
            "We thank you for your valuable contributions in making our day a success.",
            "It was such a joy to see you in your beautiful regalia, enchanting smiles, warm meet & greet... What a sight to behold?! ", 
            "This brought to mind something bigger than this, the one time event which this was patterned after, The Wedding Ceremony Of The GROOM.", 
            "This event isn't one of its kind, it's a type of what is coming soon. That which has been talked about before and is coming to pass shortly. Everything you saw here and far more glorious is what awaits us there.",
            "Everyone has been invited but like every event, not all take it seriously & attend; but you're not entitled to all that's been provided for if you turn it down.",
            "The access card is simple: Do you know Jesus, Do you have a living relationship with Him, is He Lord & King over your life... How do you attend an event you don't know the parties involved nor granted access card?!",
            "It's our joy to have you here & we want to also see you in God's blossom which is accessible only through His Son, Jesus The Christ. This is a good opportunity to make that life defining decision. Simply believe in His finished works for you & accept His outstretched Arms Of Love. Guess what, we wouldn't mind to be part of your journey if you want us to pray with you & help in your growth journeys, it would be a great honour.",
            "Again thank you for making OA Affairs memorable...",
          ],
          translation: null,
        },
      ],
    },
  ],
  photographyOrder: [
    "The Couple with Officiating Minister",
    "Couple with Bride's Parents",
    "Couple with Groom's Parents",
    "Couple with both Parents",
    "Couple with Bride's family",
    "Couple with Groom's family",
    "Couple with Bride's siblings",
    "Couple with Groom's family",
    "Couple with CDDSI",
    "Couple with FOUNDATION SYSTEMS NIGERIA LIMITED",
    "Couple with FIRST BAPTIST CHURCH FESTAC",
    "Couple with CHILDREN DEPT. FIRST BAPTIST CHURCH",
    "Couple with MIV",
    "Couple with MIV MEDIA",
    "Couple with Issachar Revelator",
    "Couple with MIV WH Broadcast Team",
    "Couple with MIV WH Drama Team",
    "Couple with NIFES",
    "Couple alone",
    "Bride alone",
    "Groom alone",
    "Best man and Chief Bridemaid",
    "Couple with little and little bride",
    "Bride and Chief Bridesmaid",
  ],
};


/* ---------------------------
   4. COMMON COMPONENTS (typed)
   --------------------------- */

/** ThemeButton - typed props so no implicit any */
type ThemeButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const ThemeButton: React.FC<ThemeButtonProps> = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`
      px-6 py-3 font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]
      bg-[#556B2F] text-white hover:bg-opacity-90
      dark:bg-white dark:text-[#556B2F] dark:hover:bg-gray-100
      ${className}
    `}
  >
    {children}
  </button>
);

/** DetailItem - typed icon and props so no implicit any */
type DetailItemProps = {
  icon: React.ComponentType<{ size?: number; className?: string } | any>;
  label: string;
  value: string;
  themeClasses: ThemeClasses;
};

const DetailItem: React.FC<DetailItemProps> = ({ icon: Icon, label, value, themeClasses }) => (
  <div className="flex items-start mb-4 p-3 border-l-4 border-l-[#FFD700]">
    <Icon size={20} className={`mt-1 mr-3 flex-shrink-0 ${themeClasses.accentText}`} />
    <div>
      <p className="font-medium text-sm opacity-60 uppercase">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

/* ---------------------------
   5. ROOT APP
   --------------------------- */

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<PageName>("details");
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const mainElement = document.getElementById("main-content");
    if (mainElement) {
      if (isDarkMode) {
        mainElement.classList.add("dark");
        mainElement.classList.remove("light");
      } else {
        mainElement.classList.add("light");
        mainElement.classList.remove("dark");
      }
    }
  }, [isDarkMode]);

  const navigateTo = useCallback((page: PageName) => {
    if (currentPage === "details") {
      setScrollPosition(window.scrollY);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const toggleTheme = useCallback(() => setIsDarkMode((prev) => !prev), []);

  const themeClasses = useMemo<ThemeClasses>(() => ({
    bg: isDarkMode ? "bg-gray-900" : "bg-gray-50",
    text: isDarkMode ? "text-gray-100" : "text-gray-900",
    card: isDarkMode ? "bg-gray-800 shadow-xl" : "bg-white shadow-lg",
    border: isDarkMode ? "border-gray-700" : "border-gray-200",
    primaryText: `text-[#556B2F]`,
    accentText: `text-[#FFD700]`,
  }), [isDarkMode]);

  const CurrentPage = currentPage === "details"
    ? <DetailsPage themeClasses={themeClasses} navigateTo={navigateTo} />
    : <OrderOfServicePage themeClasses={themeClasses} navigateTo={navigateTo} />;

  return (
    <div id="main-content" className={`${isDarkMode ? "dark" : "light"} min-h-screen ${themeClasses.bg} ${themeClasses.text} transition-colors duration-500`}>
      {/* Header */}
      <header className={`sticky top-0 z-20 w-full ${themeClasses.card} ${themeClasses.border} border-b py-4 backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className={`text-xl sm:text-2xl font-['Playfair_Display'] font-extrabold tracking-wider ${themeClasses.primaryText}`}>
            {WEDDING_DATA.couple.names}
            <span className={themeClasses.accentText}> '25</span>
          </h1>

          <nav className="flex items-center space-x-4">
            <button
              onClick={() => navigateTo("details")}
              className={`text-sm md:text-base font-medium ${currentPage === "details" ? themeClasses.accentText : "opacity-70"} hover:opacity-100 transition`}
            >
              Details
            </button>

            <button
              onClick={() => navigateTo("service")}
              className={`text-sm md:text-base font-medium ${currentPage === "service" ? themeClasses.accentText : "opacity-70"} hover:opacity-100 transition`}
            >
              Service
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${themeClasses.card} shadow-inner hover:ring-2 ring-[#FFD700] transition duration-300`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} className={themeClasses.accentText} /> : <Moon size={20} className={themeClasses.primaryText} />}
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {CurrentPage}
      </main>

      <Footer themeClasses={themeClasses} />
    </div>
  );
};

/* ---------------------------
   6. DETAILS PAGE COMPONENT
   --------------------------- */

type DetailsPageProps = {
  themeClasses: ThemeClasses;
  navigateTo: (page: PageName) => void;
};

const DetailsPage: React.FC<DetailsPageProps> = ({ themeClasses, navigateTo }) => {
  const [activeFilter, setActiveFilter] = useState<string>("none");

  const filters: { name: string; filter: string }[] = [
    { name: "None", filter: "none" },
    { name: "Warm", filter: "sepia(0.3) saturate(1.2)" },
    { name: "Classic", filter: "grayscale(0.6) contrast(1.1)" },
    { name: "Vivid", filter: "saturate(1.8) brightness(1.1)" },
  ];

  return (
    <section className="space-y-16">
      {/* Hero Header */}
      <div className="text-center pt-8 animate-fade-in">
        <h2 className={`text-4xl sm:text-6xl md:text-7xl font-['Playfair_Display'] font-bold mb-4 ${themeClasses.primaryText}`}>
          {WEDDING_DATA.couple.names}
        </h2>
        <p className={`text-lg sm:text-xl font-medium tracking-widest ${themeClasses.accentText}`}>
          29.11.2025 | LAGOS, NIGERIA
        </p>
      </div>

      {/* Gallery */}
      <div className={`p-6 rounded-xl ${themeClasses.card} border ${themeClasses.border} transition duration-500 animate-slide-up delay-1`}>
        <h3 className={`text-3xl font-['Playfair_Display'] font-bold mb-6 text-center ${themeClasses.primaryText}`}>
          Moments
        </h3>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.name}
              onClick={() => setActiveFilter(f.filter)}
              className={`px-4 py-2 text-sm rounded-full transition duration-300 ${
                activeFilter === f.filter
                  ? `bg-[#FFD700] text-[#556B2F] font-bold shadow-md`
                  : `${themeClasses.card} border ${themeClasses.border} opacity-80 hover:opacity-100`
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {WEDDING_DATA.gallery.map((img, index) => (
            <div
              key={img.id}
              className="aspect-square w-full rounded-xl overflow-hidden shadow-lg transition duration-500 ease-out hover:shadow-2xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={img.url}
                alt={`Wedding moment ${img.id}`}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                style={{ filter: activeFilter === "none" ? (img.filter ?? "none") : activeFilter, transform: "scale(1.02)" }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).onerror = null;
                  (e.currentTarget as HTMLImageElement).src = "https://placehold.co/500x500/000000/FFFFFF?text=Image+Error";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* How We Met & Celebration Details */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className={`p-8 rounded-xl ${themeClasses.card} border ${themeClasses.border} transition duration-500 animate-slide-up delay-2`}>
          <h3 className={`text-3xl font-['Playfair_Display'] font-bold mb-4 ${themeClasses.accentText}`}>
            <Heart size={24} className="inline mr-2" />
            {WEDDING_DATA.howWeMet.title}
          </h3>
          <p className="text-base leading-relaxed opacity-90">
            {WEDDING_DATA.howWeMet.story}
          </p>
        </div>

        <div className={`p-8 rounded-xl ${themeClasses.card} border ${themeClasses.border} transition duration-500 animate-slide-up delay-3`}>
          <h3 className={`text-3xl font-['Playfair_Display'] font-bold mb-6 ${themeClasses.primaryText}`}>
            The Celebration
          </h3>


          <DetailItem icon={Calendar} label="Date" value={WEDDING_DATA.date} themeClasses={themeClasses} />
          <DetailItem icon={Clock} label="Time" value={WEDDING_DATA.time} themeClasses={themeClasses} />
          <DetailItem icon={MapPin} label="Location" value={WEDDING_DATA.location} themeClasses={themeClasses} />

          <div className="mt-8">
            <ThemeButton onClick={() => navigateTo("service")} className="w-full">
              View Order of Service <ArrowRight className="inline ml-2" size={20} />
            </ThemeButton>
          </div>
        </div>
      </div>

      {/* RSVP */}
      <div className={`p-8 rounded-xl ${themeClasses.card} border ${themeClasses.border} transition duration-500 animate-slide-up delay-4`}>
        <h3 className={`text-3xl font-['Playfair_Display'] font-bold mb-6 text-center ${themeClasses.accentText}`}>
          RSVP Contacts
        </h3>
        <p className="text-center mb-6 opacity-70">
          For physical RSVPs, accommodations, or urgent inquiries, please contact:
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {WEDDING_DATA.contacts.map((contact, index) => (
            <div key={index} className={`p-4 border rounded-lg ${themeClasses.border} flex flex-col items-center w-full sm:w-64 transition hover:ring-2 ring-[#556B2F]`}>
              <h4 className="font-semibold text-lg">{contact.name}</h4>
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className={`flex items-center mt-2 ${themeClasses.primaryText} hover:underline transition duration-200`}
              >
                <Phone size={16} className="mr-2" />
                {contact.phone}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Animations + font import */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.8s ease-out forwards; opacity: 0; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
      `}</style>
    </section>
  );
};

/* ---------------------------
   7. ORDER OF SERVICE PAGE (typed)
   --------------------------- */

type OrderOfServicePageProps = {
  themeClasses: ThemeClasses;
  navigateTo: (page: PageName) => void;
};

const OrderOfServicePage: React.FC<OrderOfServicePageProps> = ({ themeClasses, navigateTo }) => {
  // map key -> boolean (true = show translation / Yoruba)
  const [translationMap, setTranslationMap] = useState<Record<string, boolean>>({});

  const toggleTranslation = (key: string) => {
    setTranslationMap((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /**
   * renderDetails typed to accept either string or array and optional translation
   */
  const renderDetails = (
  details: string | string[],
  translation: string | string[] | null | undefined,
  keyPrefix: string
): React.ReactNode => {
  const detailArray = Array.isArray(details) ? details : [details];
  const translationArray =
    translation && Array.isArray(translation)
      ? translation
      : translation
        ? [translation]
        : null;

  const detailKey = `${keyPrefix}-toggle`;
  const isYoruba = translationMap[detailKey] && translationArray;

  // Determine which content version to show (English or Yoruba)
  const contentArray = isYoruba && translationArray ? translationArray : detailArray;

  return (
    <div className="mb-4 space-y-1">
      {contentArray.map((text, i) => (
        <p key={i} className="text-base leading-relaxed">
          {text}
        </p>
      ))}

      {translationArray && (
        <button
          onClick={() =>
            setTranslationMap((prev) => ({
              ...prev,
              [detailKey]: !prev[detailKey],
            }))
          }
          className={`text-xs mt-1 font-medium italic opacity-70 hover:opacity-100 transition focus:outline-none ${themeClasses.primaryText}`}
        >
          {isYoruba ? "Show English" : "Fí Yorùbá Hàn (Show Yoruba)"}
        </button>
      )}
    </div>
  );
};


  const coupleNames = WEDDING_DATA.couple.names;

  return (
    <section className="space-y-12 py-4">
      <div className={`p-6 rounded-xl ${themeClasses.card} border ${themeClasses.border} transition duration-500 animate-slide-up`}>
        <button
          onClick={() => navigateTo("details")}
          className={`flex items-center text-sm font-medium opacity-80 hover:opacity-100 mb-6 ${themeClasses.accentText}`}
        >
          <ArrowRight size={16} className="rotate-180 mr-2" /> Back to Details
        </button>

        <h2 className={`text-4xl sm:text-5xl font-['Playfair_Display'] font-extrabold text-center mb-2 ${themeClasses.primaryText}`}>
          Order of Service
        </h2>
        <h3 className={`text-xl font-medium text-center mb-8 ${themeClasses.accentText}`}>
          The Holy Matrimony of Fadekemi Oluwabunmi and Ayobami Akorede
        </h3>

        <div className={`p-4 rounded-lg border-2 border-[#FFD700] border-opacity-30 mb-8`}>
          <p className="text-center font-semibold mb-2">Officiating Ministers:</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm opacity-90">
            {WEDDING_DATA.officiatingMinisters.map((minister, index) => (
              <span key={index} className="flex items-center">
                <BookOpen size={14} className={`mr-1 ${themeClasses.accentText}`} />
                {minister.name} <span className="text-xs opacity-70 ml-1">({minister.origin})</span>
              </span>
            ))}
          </div>
        </div>

        <div className={`mt-8 mb-10 p-6 rounded-lg border ${themeClasses.border} bg-opacity-50 transition duration-500 animate-slide-up delay-1`}>
          <h4 className={`text-2xl font-['Playfair_Display'] font-bold mb-4 ${themeClasses.primaryText}`}>
            Table of Contents
          </h4>
          <ul className="list-disc pl-5 space-y-2 text-base">
            {ORDER_OF_SERVICE_DATA.sections.map((section, index) => (
              <li key={index} className="opacity-90">
                <a href={`#section-${index}`} className={`hover:text-[#FFD700] transition`}>
                  {section.header}
                  {section.anchor && (
                    <span className="text-xs italic opacity-60 ml-2"> (Anchor: {section.anchor})</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-8">
        {ORDER_OF_SERVICE_DATA.sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            id={`section-${sectionIndex}`}
            className={`p-8 rounded-xl ${themeClasses.card} border ${themeClasses.border} transition duration-500 animate-slide-up delay-${sectionIndex + 2}`}
          >
            <div className={`mb-4 pb-2 border-b-2 border-b-[#556B2F] border-opacity-30`}>
              <h4 className={`text-3xl font-['Playfair_Display'] font-bold ${themeClasses.primaryText}`}>
                {section.header}
              </h4>
              {section.anchor && (
                <p className={`text-sm font-medium italic mt-1 ${themeClasses.accentText}`}>
                  Anchored by: {section.anchor}
                </p>
              )}
            </div>

            {/* Section purpose summary */}
            {section.purpose && (
              <div className="mb-6 opacity-90">
                <p className="italic text-sm">{section.purpose}</p>
              </div>
            )}

            <div className="space-y-6 mt-8">
              {section.subsections?.map((subsection, subsectionIndex) => (
                <div key={subsectionIndex} className="p-3 rounded-md transition hover:ring-1 ring-[#FFD700] ring-opacity-50">
                  <h5 className="font-semibold text-lg mb-2 opacity-95">
                    <span className={`text-[#FFD700] mr-2`}>&mdash;</span>
                    {subsection.subheader}
                  </h5>

                  {renderDetails(
                    subsection.details,
                    subsection.translation,
                    `${sectionIndex}-${subsectionIndex}`
                  )}
                </div>
              ))}

            </div>
          </div>
        ))}

        <div className={`p-8 rounded-xl ${themeClasses.card} border ${themeClasses.border} transition duration-500 animate-slide-up delay-4`}>
          <h4 className={`text-3xl font-['Playfair_Display'] font-bold mb-6 ${themeClasses.primaryText}`}>
            Order of Photography
          </h4>
          <ol className="list-decimal list-inside space-y-2 text-base pl-2">
            {ORDER_OF_SERVICE_DATA.photographyOrder.map((item, index) => (
              <li key={index} className="opacity-90">
                {item}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

/* ---------------------------
   8. FOOTER
   --------------------------- */

type FooterProps = {
  themeClasses: ThemeClasses;
};

const Footer: React.FC<FooterProps> = ({ themeClasses }) => (
  <footer className={`mt-12 py-8 border-t ${themeClasses.border} ${themeClasses.bg} text-center`}>
    <p className="text-sm opacity-70 mb-2">
      Made with <Heart size={14} className={`inline ${themeClasses.accentText} mx-1`} fill={COLORS.accent} /> for {WEDDING_DATA.couple.names} by Philip Ajayi
    </p>
    <div className="flex justify-center space-x-4">
      <a href="https://www.instagram.com/philipgigaloluwa?igsh=MWM1dHJ4djl1cWRqdQ==" aria-label="Social Link" className={`hover:text-[#FFD700] transition`}>
        <Instagram size={20} />
      </a>
      <a href="https://www.linkedin.com/in/philip-gigaloluwa-ajayi?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" aria-label="Social Link" className={`hover:text-[#FFD700] transition`}>
        <Linkedin size={20} />
      </a>
    </div>
  </footer>
);

export default App;
