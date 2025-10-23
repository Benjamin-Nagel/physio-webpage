
import type { Complaint } from "@/types/types";

export const complaints = [
    {
          id: 186,
          slug: "sportverletzung",
          image: 115,
          name: "Sportverletzung",
          short_description: "Gezielte Therapie fördert Heilung, stabilisiert die Muskulatur und erleichtert die Rückkehr zu sportlicher Aktivität.",
          description: `
            <div>
<div>Sportverletzungen wie Zerrungen, Bänderrisse oder Prellungen beeinträchtigen die Beweglichkeit und Leistungsfähigkeit. Physiotherapie unterstützt die Heilung durch Schmerzlinderung, Stabilisation, Beweglichkeitstraining und funktionelle Übungen. Der Fokus liegt darauf, die Verletzung optimal auszuheilen, das Verletzungsrisiko zu minimieren und eine sichere Rückkehr zu sportlichen Aktivitäten zu ermöglichen.</div>
</div>
          `,
          icon: (<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><title>Sportverletzung</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M32 14H36V34H32V25H16V34H12V14H16V23H32V14ZM6 23V17H10V31H6V25H4V23H6ZM44 25H42V31H38V17H42V23H44V25Z" fill="currentColor"/> </svg>),
          treatments: [
            "kaeltetherapie", "klassische-massagetherapie", "krankengymnastik", "krankengymnastik-am-geraet", "manuelle-therapie", "personal-training", "waermetherapie"
          ]

      },{
          id: 185,
          slug: "rueckenschmerzen",
          image: 116,
          name: "Rückenschmerzen",
          short_description: "Kräftigungs- und Dehnübungen lindern Schmerzen, verbessern die Haltung und erhöhen die Belastbarkeit im Alltag.",
          description: `
            <div>
<div>Rückenschmerzen sind weit verbreitet und können durch Verspannungen, Fehlhaltungen oder degenerative Veränderungen entstehen. Physiotherapeutische Maßnahmen helfen, die Muskulatur zu kräftigen, die Beweglichkeit zu fördern und Haltungsdefizite auszugleichen. Ziel ist es, Schmerzen zu reduzieren, Rückfälle zu vermeiden und die Belastbarkeit im Alltag und Beruf zu erhöhen.</div>
</div>
          `,
          icon: (<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><title>Rückenschmerzen</title> <path d="M33 12C35.2091 12 37 10.2091 37 8C37 5.79086 35.2091 4 33 4C30.7908 4 29 5.79086 29 8C29 10.2091 30.7908 12 33 12Z" fill="currentColor"/> <path d="M11.4694 9.66171C10.9817 9.40248 10.3762 9.58766 10.117 10.0753C9.85777 10.563 10.043 11.1685 10.5306 11.4277L14.2449 13.4021L12.574 14.1017C12.2202 14.2498 11.9823 14.5872 11.9616 14.9702C11.9409 15.3532 12.1411 15.7143 12.4769 15.8996L17.4136 18.6243C17.8971 18.8912 18.5054 18.7155 18.7723 18.232C19.0392 17.7485 18.8635 17.1402 18.38 16.8733L15.2539 15.1479L16.9638 14.4321C17.3203 14.2828 17.5588 13.9416 17.5766 13.5557C17.5944 13.1697 17.3882 12.808 17.047 12.6266L11.4694 9.66171Z" fill="currentColor"/> <path d="M21.179 17.6861C22.7468 15.1192 25.3262 13.0933 29 13.0933C29.9157 13.0933 30.7144 13.7151 30.9389 14.6028L32.689 21.5215L36.7428 23.143C37.7683 23.5533 38.2672 24.7172 37.8569 25.7428C37.4467 26.7683 36.2828 27.2672 35.2572 26.857L30.2572 24.857C29.6627 24.6192 29.2181 24.1112 29.0611 23.4905L28.3045 20.4994C28.0765 21.0523 27.8522 21.6439 27.6378 22.2691C26.7441 24.8753 26.0743 27.9158 25.999 30.937C25.9997 30.9579 26 30.9789 26 31V42C26 43.1046 25.1046 44 24 44C22.8954 44 22 43.1046 22 42V32.219L21.9478 32.1524C21.6462 31.7659 21.2403 31.2237 20.8305 30.6073C20.4249 29.9974 19.9904 29.2774 19.6507 28.5394C19.3301 27.8428 19 26.9337 19 26C19 23.2998 19.6492 20.1907 21.179 17.6861Z" fill="currentColor"/> <path d="M32 30.8333C32 29.1765 33.3431 27.8333 35 27.8333C36.6568 27.8333 38 29.1765 38 30.8333V43C38 43.5523 37.5523 44 37 44C36.4477 44 36 43.5523 36 43V30.8333C36 30.2811 35.5523 29.8333 35 29.8333C34.4477 29.8333 34 30.2811 34 30.8333V31.0556C34 31.6078 33.5523 32.0556 33 32.0556C32.4477 32.0556 32 31.6078 32 31.0556V30.8333Z" fill="currentColor"/> <path d="M9.83169 19.9783C9.94247 19.4179 10.4551 19.051 10.9766 19.159L14.6432 19.9181C14.9946 19.9909 15.2755 20.2673 15.3723 20.6357C15.4691 21.004 15.3657 21.4033 15.1041 21.6721L14.3066 22.4913L16.2447 22.9955C16.7604 23.1297 17.069 23.6882 16.9338 24.2429C16.7987 24.7977 16.271 25.1387 15.7553 25.0045L12.1302 24.0614C11.7905 23.9731 11.526 23.6933 11.4394 23.3309C11.3527 22.9685 11.4577 22.5805 11.7134 22.3178L12.4374 21.5741L10.5754 21.1886C10.0539 21.0806 9.72091 20.5388 9.83169 19.9783Z" fill="currentColor"/> </svg>),
          treatments: [
            "kaeltetherapie", "klassische-massagetherapie", "krankengymnastik", "manuelle-therapie", "waermetherapie"
          ]

      },{
          id: 184,
          slug: "gelenkbeschwerden",
          image: 117,
          name: "Gelenkbeschwerden",
          short_description: "Stärkung, Stabilisierung und Mobilisation der Gelenke helfen, Schmerzen zu reduzieren und die Beweglichkeit zu erhalten.",
          description: `
            <div>
<div>Gelenkbeschwerden, wie sie bei Arthrose, Entzündungen oder nach Verletzungen auftreten, führen häufig zu Schmerzen und Bewegungseinschränkungen. Physiotherapie unterstützt durch gezielte Übungen die Stabilität, Beweglichkeit und Belastbarkeit der Gelenke. Das Training kann Schmerzen reduzieren, die Muskulatur stärken und langfristig die Selbstständigkeit im Alltag verbessern.</div>
</div>
          `,
          icon: (<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><title>Gelenkbeschwerden</title> <path fill-rule="evenodd" clip-rule="evenodd" d="M19 4C19.5523 4 20 4.44772 20 5L20 13.3432C20 14.404 19.5786 15.4214 18.8284 16.1716L18.3246 16.6755C17.0407 17.9593 17.0407 20.0408 18.3246 21.3246C19.3251 22.3251 20.8537 22.5732 22.1193 21.9404L22.3617 21.8192C23.393 21.3035 24.607 21.3035 25.6383 21.8192L25.8807 21.9404C27.1463 22.5732 28.6749 22.3251 29.6754 21.3246C30.9593 20.0408 30.9593 17.9593 29.6754 16.6755L29.1716 16.1716C28.4214 15.4214 28 14.404 28 13.3432L28 5C28 4.44772 28.4477 4 29 4C29.5523 4 30 4.44772 30 5V7.02425C36.9912 9.49527 42 16.1627 42 24C42 31.8373 36.9912 38.5048 30 40.9758V43C30 43.5523 29.5523 44 29 44C28.4477 44 28 43.5523 28 43L28 34.6569C28 33.596 28.4214 32.5786 29.1716 31.8284L29.6754 31.3246C30.9593 30.0408 30.9593 27.9593 29.6754 26.6755C28.6749 25.6749 27.1463 25.4268 25.8807 26.0597L25.6383 26.1809C24.607 26.6965 23.393 26.6965 22.3617 26.1809L22.1193 26.0597C20.8537 25.4268 19.3251 25.6749 18.3246 26.6755C17.0407 27.9593 17.0407 30.0407 18.3246 31.3246L18.8284 31.8284C19.5786 32.5786 20 33.596 20 34.6569L20 43C20 43.5523 19.5523 44 19 44C18.4477 44 18 43.5523 18 43V40.9758C11.0088 38.5048 6 31.8373 6 24C6 16.1627 11.0088 9.49527 18 7.02425V5C18 4.44772 18.4477 4 19 4Z" fill="currentColor"/> </svg>),
          treatments: [
            
          ]

      },{
          id: 181,
          slug: "craniomandibulaeren-dysfunktion",
          image: 90,
          name: "Craniomandibulären Dysfunktion",
          short_description: "Physiotherapie entspannt die Kiefermuskulatur, verbessert die Beweglichkeit und reduziert Schmerzen im Kiefer- und Kopfbereich.",
          description: `
            <div>
<div>Craniomandibuläre Dysfunktion bezeichnet Beschwerden im Kiefergelenk und der umliegenden Muskulatur. Symptome können Kopfschmerzen, Verspannungen, Knacken oder eingeschränkte Beweglichkeit des Kiefers sein. Physiotherapeutische Behandlungen zielen darauf ab, die Muskulatur zu entspannen, die Beweglichkeit des Kiefers zu verbessern und Fehlhaltungen zu korrigieren, um Schmerzen zu lindern und die Funktionalität im Alltag zu erhöhen.</div>
</div>
          `,
          icon: (<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><title>Craniomandibulären Dysfunktion</title> <path d="M12.2857 42V29.9025C10.5546 28.1181 7.14289 23.6639 7.14282 17.9222C7.14277 13.8404 10.1568 6 21.9823 6C28.0602 6 30.7599 7.4856 33.1299 9.66743C33.2314 9.76084 33.3308 9.85149 33.428 9.94007C34.2801 10.7169 34.9579 11.3349 35.3079 12.2605C36.6082 15.6996 38.9481 20.7122 40.4505 23.8477C41.0916 25.1856 40.1177 26.7437 38.634 26.7437H37.3239V31.5C37.3239 32.6046 36.4285 33.5 35.3239 33.5H32.1154C32.0704 33.4948 32.0246 33.4927 31.9782 33.4937C31.7879 33.4978 31.591 33.4999 31.3887 33.5C31.3812 33.5 31.3738 33.5 31.3663 33.5C30.0936 33.4995 28.6099 33.4198 27.216 33.2741C25.5685 33.1019 24.1404 32.8467 23.3377 32.5587C22.8178 32.3722 22.2452 32.6425 22.0587 33.1623C21.8722 33.6822 22.1425 34.2548 22.6623 34.4413C23.7058 34.8156 25.3373 35.0886 27.0081 35.2632C27.6609 35.3315 28.334 35.3861 29 35.4256V42H12.2857Z" fill="currentColor"/> </svg>),
          treatments: [
            
          ]

      },{
          id: 180,
          slug: "atemerkrankungen",
          image: 99,
          name: "Atemerkrankungen",
          short_description: "Gezielte Atemübungen und Mobilisation stärken die Lunge, lindern Atemnot und verbessern die Leistungsfähigkeit im Alltag.",
          description: `
            <div>
<div>Atemerkrankungen wie Asthma, COPD oder chronische Bronchitis können die Lebensqualität erheblich beeinträchtigen. In der Physiotherapie lernen Patienten gezielte Atemtechniken, Muskelkräftigung und Mobilisationsübungen, die die Lungenfunktion unterstützen, die Atemnot reduzieren und die körperliche Leistungsfähigkeit steigern. Ziel ist es, die Atmung effizienter zu gestalten und Alltagsaktivitäten wieder leichter bewältigen zu können.</div>
</div>
          `,
          icon: (<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><title>Atemerkrankungen</title> <path d="M16.542 11.991C22.3921 11.9958 21.8536 19.9527 21.8511 23.1357C21.8478 27.198 22.8451 35.3972 19.7112 38.5181C16.5177 41.6984 10.1346 43.2846 6.94587 40.6296C3.75713 37.9745 9.09663 11.9849 16.542 11.991Z" fill="currentColor"/> <path d="M31.4826 12.0033C25.6326 11.9985 26.158 19.9563 26.1554 23.1392C26.152 27.2016 25.1413 35.3991 28.27 38.5252C31.4583 41.7107 37.8388 43.3074 41.0319 40.6576C44.2249 38.0077 38.928 12.0094 31.4826 12.0033Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M23.0175 5.99927C23.0175 5.99927 23.0175 5.99915 24.0175 5.99997C25.0175 6.00079 25.0175 6.00091 25.0175 6.00091L25.0056 20.4938C25.0039 22.5951 24.0675 23.7995 23.0074 24.4169C22.51 24.7066 22.0215 24.847 21.6634 24.9163C21.4824 24.9514 21.3289 24.9694 21.2159 24.9787C21.1592 24.9834 21.1123 24.9859 21.0765 24.9873C21.0587 24.988 21.0436 24.9884 21.0314 24.9886L21.0154 24.9888L21.0091 24.9888L21.0052 24.9888C21.0052 24.9888 21.004 24.9888 21.0048 23.9888C21.0056 22.9888 21.0045 22.9888 21.0045 22.9888H21.0035L21.0016 22.9889L20.9986 22.9889L20.9954 22.9889C20.9954 22.9889 20.9976 22.9889 21.0004 22.9887C21.0086 22.9884 21.0261 22.9876 21.0514 22.9855C21.1024 22.9813 21.1831 22.9722 21.2832 22.9528C21.4872 22.9133 21.7484 22.8357 22.0009 22.6886C22.4404 22.4327 23.0044 21.8892 23.0056 20.4922L23.0175 5.99927Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M25.0175 6.00091C25.0175 6.00091 25.0175 6.00079 24.0175 5.99997C23.0175 5.99915 23.0175 5.99927 23.0175 5.99927L23.0056 20.4922C23.0039 22.5935 23.9382 23.7994 24.9974 24.4185C25.4943 24.709 25.9825 24.8502 26.3405 24.9201C26.5215 24.9555 26.675 24.9738 26.7879 24.9833C26.8446 24.988 26.8916 24.9906 26.9273 24.9921C26.9452 24.9928 26.9603 24.9932 26.9724 24.9934L26.9884 24.9937L26.9947 24.9937L26.9974 24.9937L26.9986 24.9937C26.9986 24.9937 26.9998 24.9937 27.0006 23.9937C27.0014 22.9937 27.0026 22.9937 27.0026 22.9937L27.0036 22.9937L27.0055 22.9937L27.0085 22.9938L27.0117 22.9938C27.0117 22.9938 27.0107 22.9938 27.0066 22.9936C26.9984 22.9933 26.981 22.9924 26.9557 22.9903C26.9047 22.986 26.824 22.9768 26.724 22.9572C26.52 22.9174 26.2589 22.8393 26.0067 22.6919C25.5676 22.4352 25.0044 21.8908 25.0056 20.4938L25.0175 6.00091Z" fill="currentColor"/> </svg>),
          treatments: [
            
          ]

      }   
] as const satisfies Complaint[]; 