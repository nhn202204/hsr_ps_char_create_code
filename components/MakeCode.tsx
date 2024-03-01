"use client"

import { CharacterData, CharacterDatas, LightconeData, RelicsData, StatObj } from "@/data/type"
import { FC } from "react"
import { useIsClient } from "usehooks-ts"

import { CopyBlock, dracula } from 'react-code-blocks';
import { MainAffixPicked } from "./CharacterStat";
import { useLocale } from "next-intl";
import { RATE_BONUS_POINT_PER_STEP, SUB_AFFIX_ID } from "@/data/constant";

function MyCoolCodeBlock({ code }: { code: string }) {
  return (
    <CopyBlock
      text={code}
      language={"cs"}
      // showLineNumbers
      theme={dracula}
      // wrapLongLines
      // codeBlock={true}
      customStyle={{ overflow: "auto" }}
    />
  )
}

interface Props { id: string }

const MakeCode: FC = () => {
  // console.log("🚀 ~ id:", id)

  const locale = useLocale()

  const isVN = locale === "vn"

  const isClient = useIsClient()

  if (!isClient) return <p>Loading...</p>

  const code = composeFulCode(isVN)
  // const code = fullComposeStringCodeRelic(isVN)

  return (
    <div className="">
      <MyCoolCodeBlock code={code} />
    </div>
  )
}

export default MakeCode

const composeFulCode = (isVN: boolean) => {

  const code =
`using FreeSR.Gateserver.Manager.Handlers.Core;
using static FreeSR.Gateserver.Manager.Handlers.LineupReqGroup;
using FreeSR.Gateserver.Network;
using FreeSR.Proto;

namespace FreeSR.Gateserver.Manager.Handlers
{
	internal static class BattleReqGroup
	{
		[Handler(CmdType.CmdSetLineupNameCsReq)]
		public static void OnSetLineupNameCsReq(NetSession session, int cmdId, object data)
		{
			var request = data as SetLineupNameCsReq;
			if (request.Name == "battle")
			{
				var lineupInfo = new LineupInfo
				{
					ExtraLineupType = ExtraLineupType.LineupNone,
					Name = "Squad 1",
					Mp = 5,
					MaxMp = 5,
					LeaderSlot = 0
				};
				List<uint> characters = new List<uint> { Avatar1, Avatar2, Avatar3, Avatar4 };
				foreach (uint id in characters)
				{
					if (id == 0) continue;
					lineupInfo.AvatarLists.Add(new LineupAvatar
					{
						Id = id,
						Hp = 10000,
						Satiety = 100,
						Sp = new AmountInfo { CurAmount = 10000, MaxAmount = 10000 },
						AvatarType = AvatarType.AvatarFormalType,
						Slot = (uint)lineupInfo.AvatarLists.Count
					});
				}

				var sceneInfo = new SceneInfo
				{
					GameModeType = 2,
					EntryId = 2010101,
					PlaneId = 20101,
					FloorId = 20101001
				};

				var calaxInfoTest = new SceneEntityInfo
				{
					GroupId = 19,
					InstId = 300001,
					EntityId = 4194583,
					Prop = new ScenePropInfo
					{
						PropState = 1,
						PropId = 808
					},
					Motion = new MotionInfo
					{
						Pos = new Vector
						{
							X = -570,
							Y = 19364,
							Z = 4480
						},
						Rot = new Vector
						{
							Y = 180000
						}
					},
				};

				sceneInfo.EntityLists.Add(calaxInfoTest);

				session.Send(CmdType.CmdEnterSceneByServerScNotify, new EnterSceneByServerScNotify
				{
					Scene = sceneInfo,
					Lineup = lineupInfo
				});

				session.Send(CmdType.CmdSceneEntityMoveScNotify, new SceneEntityMoveScNotify
				{
					EntryId = 2010101,
					EntityId = 0,
					Motion = new MotionInfo
					{
						Pos = new Vector
						{
							X = -570,
							Y = 19364,
							Z = 4480
						},
						Rot = new Vector
						{
							Y = 180000
						}
					}
				});
			}

			session.Send(CmdType.CmdSetLineupNameScRsp, new SetLineupNameScRsp
			{
				Retcode = 0,
				Name = request.Name,
				Index = request.Index
			});
		}

		[Handler(CmdType.CmdStartCocoonStageCsReq)]
		public static void OnStartCocoonStageCsReq(NetSession session, int cmdId, object data)
		{
			var request = data as StartCocoonStageCsReq;

			Dictionary<uint, List<uint>> monsterIds = new Dictionary<uint, List<uint>>
						{
								{ 1, new List<uint> { 3013010, 3012010, 3013010, 3001010 } },
								{ 2, new List<uint> { 8034010 } },
								{ 3, new List<uint> { 3014022 } },
						};

			Dictionary<uint, uint> monsterLevels = new Dictionary<uint, uint>
						{
								{1,70},{2,70},{3,60}
						};

			//basic
			var battleInfo = new SceneBattleInfo
			{
				StageId = 201012311,
				LogicRandomSeed = 639771447,
				WorldLevel = 6
			};

			//relic
${fullComposeStringCodeRelic(isVN)}

			//avatar
			List<uint> SkillIdEnds = new List<uint> { 1, 2, 3, 4, 7, 101, 102, 103, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210 };
			List<uint> characters = new List<uint> { Avatar1, Avatar2, Avatar3, Avatar4 };
			${composeAvatarForLoop(isVN)}

			//monster
			for (uint i = 1; i <= monsterIds.Count; i++)
			{
				SceneMonsterWave monsterInfo = new SceneMonsterWave
				{
					Pkgenfbhofi = i,
					MonsterParam = new SceneMonsterParam
					{
						Level = monsterLevels[i],
					}
				};

				if (monsterIds.ContainsKey(i))
				{
					List<uint> monsterIdList = monsterIds[i];

					foreach (uint monsterId in monsterIdList)
					{
						monsterInfo.MonsterLists.Add(new SceneMonsterInfo
						{
							MonsterId = monsterId
						});
					}

				}
				battleInfo.MonsterWaveLists.Add(monsterInfo);
			}

			var response = new StartCocoonStageScRsp
			{
				Retcode = 0,
				CocoonId = request.CocoonId,
				Wave = request.Wave,
				PropEntityId = request.PropEntityId,
				BattleInfo = battleInfo
			};

			session.Send(CmdType.CmdStartCocoonStageScRsp, response);
		}

		[Handler(CmdType.CmdPVEBattleResultCsReq)]
		public static void OnPVEBattleResultCsReq(NetSession session, int cmdId, object data)
		{
			var request = data as PVEBattleResultCsReq;
			session.Send(CmdType.CmdPVEBattleResultScRsp, new PVEBattleResultScRsp
			{
				Retcode = 0,
				EndStatus = request.EndStatus
			});
		}
	}
}
  `
  return code

}

type ComposeStringCodeRelicProps = ({
  char: CharacterData,
  isVN: boolean,
})

const composeAvatarCase = ({ charObj, isVN }: { charObj: CharacterData, isVN: boolean }) => {

  const lcPersit = localStorage.getItem(`${charObj.id}-lightcone`)
  if (lcPersit === null) return "Data Lightcone is missing"
  const lc = JSON.parse(lcPersit) as LightconeData

  const eidolonPersit = localStorage.getItem(`${charObj.id}-eidolon`)
  if (eidolonPersit === null) return "Data Eidolon is missing"
  const eidolon = JSON.parse(eidolonPersit) as number

  const code =
    `                 case ${charObj.id}:  //${charObj.name}
                      avatarData = new BattleAvatar
                      {
                          Id = characters[i],
                          Level = 80,
                          Promotion = 6,
                          Rank = ${eidolon},
                          Hp = 10000,
                          AvatarType = AvatarType.AvatarFormalType,
                          WorldLevel = 6,
                          Sp = new AmountInfo { CurAmount = 10000, MaxAmount = 10000 },
                          RelicLists = { head_${charObj.id}, arm_${charObj.id}, body_${charObj.id}, foot_${charObj.id}, sphere_${charObj.id}, rope_${charObj.id} },
                          EquipmentLists = {new BattleEquipment
                          {
                              Id = ${lc.id},  //${isVN ? lc.ten : lc.name}
                              Level = 80,
                              Promotion = 6,
                              Rank = ${lc.rank}
                          } }
                      };
                      break;`
  return code
}

const composeAvatarForLoop = (isVN: boolean) => {

  const charObjsPersit = localStorage.getItem(`char-obj-selected`)
  if (charObjsPersit === null) return "Data Character Selected is missing"
  const charObjs = JSON.parse(charObjsPersit) as CharacterDatas

  const caseCode = charObjs.map(charObj => composeAvatarCase({ charObj, isVN })).join(`
  
  `)

  const code =
    `for (int i = 0; i < characters.Count; i++)
            {
                var avatarData = new BattleAvatar();
                switch (characters[i])
                {
  ${caseCode}
                    default:
                      avatarData = new BattleAvatar
                      {
                        Id = characters[i],
                        Level = 80,
                        Promotion = 6,
                        Rank = 0,
                        Hp = 10000,
                        AvatarType = AvatarType.AvatarFormalType,
                        WorldLevel = 6,
                        Sp = new AmountInfo { CurAmount = 10000, MaxAmount = 10000 }
                      };
                      break;
                }

                foreach (uint end in SkillIdEnds)
                {
                    uint level = 1;
                    if (end == 1) level = 6; // normal attack
                    else if (end < 4 || end == 4) level = 10; // skill and ult 
                    if (end > 4) level = 1; // technique
                    avatarData.SkilltreeLists.Add(new AvatarSkillTree
                    {
                        PointId = characters[i] * 1000 + end,
                        Level = level
                    });
                }

                battleInfo.BattleAvatarLists.Add(avatarData);
            }`

  return code
}

const fullComposeStringCodeRelic = (isVN: boolean) => {

  const charObjSelectedPersit = localStorage.getItem(`char-obj-selected`)
  if (charObjSelectedPersit === null) return "Data Character Selected is missing"
  const charObjSelected = JSON.parse(charObjSelectedPersit) as CharacterDatas

  return charObjSelected.map(char => (composeStringCodeRelic({ char, isVN }))).join(`

`)
}

const composeStringCodeRelic = ({ char: { id, name }, isVN }: ComposeStringCodeRelicProps) => {

  const relicTopPersit = localStorage.getItem(`${id}-relic-top`)
  if (relicTopPersit === null) return "Data Relic Top is missing"
  const relicTop = JSON.parse(relicTopPersit) as RelicsData

  const relicMidPersit = localStorage.getItem(`${id}-relic-mid`)
  if (relicMidPersit === null) return "Data Relic Mid is missing"
  const relicMid = JSON.parse(relicMidPersit) as RelicsData

  const relicBotPersit = localStorage.getItem(`${id}-relic-bot`)
  if (relicBotPersit === null) return "Data Relic Bot is missing"
  const relicBot = JSON.parse(relicBotPersit) as RelicsData

  const relicMainAffixPersit = localStorage.getItem(`${id}-main-affix`)
  if (relicMainAffixPersit === null) return "Data Relic Main Affix is missing"
  const relicMainAffix = JSON.parse(relicMainAffixPersit) as MainAffixPicked

  const subAffixBonusPersit = localStorage.getItem(`${id}-stat-bonus`)
  if (subAffixBonusPersit === null) return "Data Relic Stat Bonus is missing"
  const subAffixBonus = JSON.parse(subAffixBonusPersit) as StatObj

  const subAffixCode_HP =
    `{
                      new RelicAffix {
                      AffixId = ${SUB_AFFIX_ID.HP},  // HP%
                      Step = ${Math.ceil(subAffixBonus.HP/RATE_BONUS_POINT_PER_STEP.HP)}
                      }
                    },`

  const subAffixCode_ATK =
    `{
                      new RelicAffix {
                      AffixId = ${SUB_AFFIX_ID.ATK},  // ATK%
                      Step = ${Math.ceil(subAffixBonus.ATK/RATE_BONUS_POINT_PER_STEP.ATK)}
                      }
                    },`

  const subAffixCode_DEF =
    `{
                      new RelicAffix {
                      AffixId = ${SUB_AFFIX_ID.DEF},  // DEF%
                      Step = ${Math.ceil(subAffixBonus.DEF/RATE_BONUS_POINT_PER_STEP.DEF)}
                      }
                    },`

  const subAffixCode_SPD =
    `{
                      new RelicAffix {
                      AffixId = ${SUB_AFFIX_ID.SPD},  // SPD
                      Step = ${Math.ceil(subAffixBonus.SPD/RATE_BONUS_POINT_PER_STEP.SPD)}
                      }
                    },`

  const subAffixCode_CR =
    `{
                      new RelicAffix {
                      AffixId = ${SUB_AFFIX_ID.CR},  // CR
                      Step = ${Math.ceil(subAffixBonus.CR/RATE_BONUS_POINT_PER_STEP.CR)}
                      }
                    },`

  const subAffixCode_CD =
    `{
                      new RelicAffix {
                      AffixId = ${SUB_AFFIX_ID.CD},  // CD
                      Step = ${Math.ceil(subAffixBonus.CD/RATE_BONUS_POINT_PER_STEP.CD)}
                      }
                    },`

  const subAffixCode_EHR =
    `{
                      new RelicAffix {
                      AffixId = ${SUB_AFFIX_ID.EHR},  // EHR
                      Step = ${Math.ceil(subAffixBonus.EHR/RATE_BONUS_POINT_PER_STEP.EHR)}
                      }
                    },`

  const subAffixCode_BREAK =
    `{
                      new RelicAffix {
                      AffixId = ${SUB_AFFIX_ID.BREAK},  // BREAK
                      Step = ${Math.ceil(subAffixBonus.BREAK/RATE_BONUS_POINT_PER_STEP.BREAK)}
                      }
                    },`

  const subAffixCode_RES =
    `{
                      new RelicAffix {
                      AffixId = ${SUB_AFFIX_ID.RES},  // RES
                      Step = ${Math.ceil(subAffixBonus.RES/RATE_BONUS_POINT_PER_STEP.RES)}
                      }
                    }`

  let subAffixCode_List =
    `SubAffixLists = {${subAffixBonus.HP ? subAffixCode_HP : ''}${subAffixBonus.ATK ? subAffixCode_ATK : ''}${subAffixBonus.DEF ? subAffixCode_DEF : ''}${subAffixBonus.SPD ? subAffixCode_SPD : ''}${subAffixBonus.CR ? subAffixCode_CR : ''}${subAffixBonus.CD ? subAffixCode_CD : ''}${subAffixBonus.EHR ? subAffixCode_EHR : ''}${subAffixBonus.BREAK ? subAffixCode_BREAK : ''}${subAffixBonus.RES ? subAffixCode_RES : ''}}`

  subAffixCode_List = subAffixCode_List === `SubAffixLists = {}` ? "" : `,
                  ${subAffixCode_List}`

  const code =
    `           // ${name}
            var head_${id} = new BattleRelic
              {
                  Id = ${relicTop.code + 1},  // ${isVN ? relicTop["ten set"] : relicTop["set name"]}
                  Level = 15,
                  MainAffixId = 1${subAffixCode_List}
              };

            var arm_${id} = new BattleRelic
              {
                  Id = ${relicTop.code + 2},  // ${isVN ? relicTop["ten set"] : relicTop["set name"]}
                  Level = 15,
                  MainAffixId = 1
              };

            var body_${id} = new BattleRelic
              {
                  Id = ${relicBot.code + 3},  // ${isVN ? relicBot["ten set"] : relicBot["set name"]}
                  Level = 15,
                  MainAffixId = ${relicMainAffix.Body.affixId}  // ${relicMainAffix.Body.affix}
              };

            var foot_${id} = new BattleRelic
              {
                  Id = ${relicBot.code + 4},  // ${isVN ? relicBot["ten set"] : relicBot["set name"]}
                  Level = 15,
                  MainAffixId = ${relicMainAffix.Foot.affixId}  // ${relicMainAffix.Foot.affix}
              };

            var sphere_${id} = new BattleRelic
              {
                  Id = ${relicMid.code + 5},  // ${isVN ? relicMid["ten set"] : relicMid["set name"]}
                  Level = 15,
                  MainAffixId = ${relicMainAffix.Sphere.affixId}  // ${relicMainAffix.Sphere.affix}
              };

            var rope_${id} = new BattleRelic
              {
                  Id = ${relicMid.code + 6},  // ${isVN ? relicMid["ten set"] : relicMid["set name"]}
                  Level = 15,
                  MainAffixId = ${relicMainAffix.Rope.affixId}  // ${relicMainAffix.Rope.affix}
              };`

  return code
}