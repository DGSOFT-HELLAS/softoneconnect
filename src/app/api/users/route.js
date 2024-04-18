import User from "../../../../server/models/User";
import connectMongo from "../../../../server/models/config";
import bcrypt from 'bcrypt';
const users = [
    {
        usercode: 1,
        code: "DGOUMAS",
        name: "ΓΚΟΥΜΑΣ ΔΗΜΗΤΡΗΣ",
        CCCDGHUB: 1,
        email: "dgoumas@dgsoft.gr"
    },
    {
        usercode: 319,
        code: "EMASMANIDOU",
        name: "ΜΑΣΜΑΝΙΔΟΥ ΕΛΕΝΗ",
        CCCDGHUB: 1,
        email: "emasmanidou@dgsoft.gr"
    },
    {
        usercode: 322,
        code: "MSAVVAS",
        name: "ΣΑΒΒΑΣ ΜΙΧΑΛΗΣ",
        CCCDGHUB: 1,
        email: "msavvas@dgsoft.gr"
    },
    {
        usercode: 330,
        code: "MKOUSI",
        name: "ΚΟΥΣΗ ΜΑΡΙΑ",
        CCCDGHUB: 1,
        email: "mkousi@dgsoft.gr"
    },
    {
        usercode: 332,
        code: "KTSIAKTANIS",
        name: "ΤΣΙΑΚΤΑΝΗΣ ΚΩΝΣΤΑΝΤΙΝΟΣ",
        CCCDGHUB: 1,
        email: "ktsiaktanis@dgsoft.gr"
    },
    {
        usercode: 333,
        code: "ABALAFOUTA",
        name: "ΜΠΑΛΑΦΟΥΤΑ ΑΝΑΣΤΑΣΙΑ",
        CCCDGHUB: 1,
        email: "abalafouta@dgsoft.gr"
    },
    {
        usercode: 340,
        code: "ACHOULIARA",
        name: "ΧΟΥΛΙΑΡΑ ΑΝΝΑ",
        CCCDGHUB: 1,
        email: "achouliara@dgsoft.gr"
    },
    {
        usercode: 341,
        code: "LCHATZI",
        name: "ΧΑΤΖΗΛΥΜΠΕΡΗ ΛΕΝΑ",
        CCCDGHUB: 1,
        email: "dgsoft@dgsoft.gr"
    },
    {
        usercode: 399,
        code: "NMAGKOYNIS",
        name: "ΜΑΓΚΟΥΝΗΣ ΝΙΚΟΣ",
        CCCDGHUB: 1,
        email: "nikos@ccm.com.gr"
    },
    {
        usercode: 405,
        code: "VRYZHKOV",
        name: "ΡΙΖΚΟΒ ΒΙΚΤΩΡ",
        CCCDGHUB: 1,
        email: "viktor@dgsoft.gr"
    },
    {
        usercode: 407,
        code: "VGEORGOPOULOS",
        name: "ΓΕΩΡΓΟΠΟΥΛΟΣ ΒΑΣΙΛΗΣ",
        CCCDGHUB: 1,
        email: "vgeorgopoulos@dgsoft.gr"
    },
    {
        usercode: 409,
        code: "MKOYTSOGIANNIS",
        name: "ΚΟΥΤΣΟΓΙΑΝΝΗΣ ΜΑΚΗΣ",
        CCCDGHUB: 1,
        email: "prodromos@ccm.com.gr"
    },
    {
        usercode: 424,
        code: "MAGGELAKIS",
        name: "ΑΓΓΕΛΑΚΗΣ ΜΑΝΩΛΗΣ",
        CCCDGHUB: 1,
        email: "maggelakis@dgsoft.gr"
    },
    {
        usercode: 426,
        code: "GANTONOPOULOS",
        name: "ΑΝΤΩΝΟΠΟΥΛΟΣ ΓΙΑΝΝΗΣ",
        CCCDGHUB: 1,
        email: "gantonopoulos@dgsoft.gr"
    },
    {
        usercode: 427,
        code: "SVASILEIOY",
        name: "ΒΑΣΙΛΕΙΟΥ ΣΤΕΛΛΑ",
        CCCDGHUB: 1,
        email: "stella@ccm.com.gr"
    },
    {
        usercode: 428,
        code: "VNIKITIDI",
        name: "ΝΙΚΗΤΙΔΗ ΒΙΒΗ",
        CCCDGHUB: 1,
        email: "vnikitidi@dgsoft.gr"
    },
    {
        usercode: 429,
        code: "ICHIOUTAKOS",
        name: "ΙΩΑΝΝΗΣ ΧΙΟΥΤΑΚΟΣ",
        CCCDGHUB: 1,
        email: "ichioutakos@dgsoft.gr"
    },
    {
        usercode: 625,
        code: "GEVAGGELOPOULOS",
        name: "ΕΥΑΓΓΕΛΟΠΟΥΛΟΣ ΓΙΩΡΓΟΣ",
        CCCDGHUB: 1,
        email: "evangelopoulos@ccm.com.gr"
    },
    {
        usercode: 626,
        code: "GKOURIS",
        name: "ΚΟΥΡΗΣ ΓΙΩΡΓΟΣ",
        CCCDGHUB: 1,
        email: "gkouris@dgsoft.gr"
    },
    {
        usercode: 629,
        code: "KTZOUANAS",
        name: "ΤΖΟΥΑΝΑΣ ΚΩΝΣΤΑΝΤΙΝΟΣ",
        CCCDGHUB: 1,
        email: "ktzouanas@dgsoft.gr"
    },
    {
        usercode: 630,
        code: "ATSIAKTANIS",
        name: "ΤΣΙΑΚΤΑΝΗΣ ΑΘΑΝΑΣΙΟΣ",
        CCCDGHUB: 1,
        email: "atsiaktanis@dgsoft.gr"
    },
    {
        usercode: 631,
        code: "FSPIROPOULOU",
        name: "ΣΠΥΡΟΠΟΥΛΟΥ ΦΛΩΡΑ",
        CCCDGHUB: 1,
        email: "fspyropoulou@dgsoft.gr"
    },
    {
        usercode: 632,
        code: "KKARDASIS",
        name: "ΚΑΡΔΑΣΗΣ ΚΩΝΣΤΑΝΤΙΝΟΣ",
        CCCDGHUB: 1,
        email: "kkardasis@dgsoft.gr"
    },
    {
        usercode: 905,
        code: "DBELESKAS",
        name: "ΜΠΕΛΕΣΚΑΣ ΔΑΜΙΑΝΟΣ",
        CCCDGHUB: 1,
        email: "dbeleskas@dgsoft.gr"
    }
];




export async function POST(req) {
        const response = {
            success: false,
            message: "Event not created",
            event: null
        }
        // await connectMongo();
        // try {
        //     let insert = await User.insertMany(users);
        //     response.success = true;
        //     response.message = "Users created";
        //     response.event = insert;

        // } catch (e) {
        //     console.log(e)
        // }
        // return Response.json(response)
        let cryptedPassword = await bcrypt.hash('123456', 10)
        let usersUpdate = await User.updateMany({}, {password: cryptedPassword})
        
        console.log(usersUpdate)
          return Response.json({response: usersUpdate})
  }