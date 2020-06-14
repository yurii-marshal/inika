import {Injectable} from '@angular/core';
import {RequestsService} from '../requests.service';
import {AppSettings} from '../../app-settings';
import {HttpClient} from '@angular/common/http';
import {get, set} from 'lodash';

export interface LessonEntity {
  name: string,
  id: number,
  wordsList: Array<Object>,
  materials: Array<Object>,
  homeworks: Array<Object>,
  tests: Array<Object>
}

@Injectable()
export class LessonsApiService {
  private lessonTypes = ['materials', 'homeworks', 'tests'];
  public lessonEntity: Object = this.getLessonEntity();
  public userLesson: Object = this.getLessonEntity();
  public exerciseMediaData: Object = this.getBuilderForm();
  // public feedbackOverallAnswersCount = {
  //   materials: 0,
  //   homeworks: 0,
  //   tests: 0
  // };
  // public feedbackTrueAnswers = {
  //   materials: 0,
  //   homeworks: 0,
  //   tests: 0
  // };

  private mediaQueriesCounter: number;

  constructor(private httpService: RequestsService,
              private http: HttpClient) {
  }

  public exerciseForm(type) {
    switch (type) {
      case -2:
        return {
          id: null,
          exerciseHeader: '',
          items: []
        };
      case -1:
        return {
          id: null,
          exerciseHeader: '',
          items: []
        };
      case 0:
        return {
          id: null,
          exerciseHeader: 'Выберите правильный вариант ответа из выпадающего списка',
          exerciseList: [],
          sentencesList: []
        };
      case 1:
        return {
          id: null,
          exerciseHeader: 'Расставьте слова в правильном порядке',
          sentencesList: [],
          exerciseList: []
        };
      case 2:
        return {
          id: null,
          exerciseHeader: 'Заполните пропуски в предложениях корректными словами',
          dropItems: [],
          sentencesList: [],
          exerciseList: [],
          dragItems: [],
          dragSamples: [],
          sampleItem: '',
        };
      case 3:
        return {
          id: null,
          exerciseHeader: 'Сопоставьте слово с соответствующим изображением',
          uploadedFiles: [],
          dragItems: [],
          sentencesList: []
        };
      case 4:
        return {
          id: null,
          exerciseHeader: 'Напишите правильный ответ',
          sentencesList: [],
          exerciseList: []
        };
      case 5:
        return {
          id: null,
          exerciseHeader: 'Прочтите текст',
          htmlContent: '',
          sentencesList: []
        };
      case 6:
        return {
          id: null,
          exerciseHeader: 'Перейдите по ссылке',
          refStr: '',
          sentencesList: []
        };
      case 7:
        return {
          id: null,
          exerciseHeader: 'Просмотрите изображение',
          url: '',
          sentencesList: []
        };
      case 8:
        return {
          id: null,
          exerciseHeader: 'Просмотрите видеозапись',
          refStr: '',
          name: '',
          sentencesList: []
        };
      case 9:
        return {
          id: null,
          exerciseHeader: 'Прослушайте аудиозапись',
          sentencesList: [],
        };
      default:
        return {
          id: null,
          type: 'unrecognized!',
          exerciseHeader: 'unrecognized',
          sentencesList: []
        };
    }
  };

  private getBuilderForm() {
    return {
      materials: [],
      homeworks: [],
      tests: []
    };
  }

  private getLessonEntity() {
    return {
      name: '',
      id: null,
      wordsList: [],
      materials: [],
      homeworks: [],
      tests: []
    };
  }

  public onAddExercise(exerciseType, pageType) {
    // console.log(pageType);
    exerciseType >= 0 ?
      this.lessonEntity[pageType].push({
        id: null,
        type: exerciseType,
        data: this.exerciseForm(exerciseType)
      }) :
      this.lessonEntity[pageType].push({
        id: null,
        type: exerciseType
      });
  }

  public onRemoveExercise(index, pageType) {
    const id = this.lessonEntity[pageType][index]['data']['id'];
    if (id) {
      this.deleteExerciseById(id,
        (data) => {
          this.checkAndDeleteMediaDataItems(pageType, index);
          this.lessonEntity[pageType].splice(index, 1);
        },
        (err) => {

        }
      );
    } else {
      this.checkAndDeleteMediaDataItems(pageType, index);
      this.lessonEntity[pageType].splice(index, 1);
    }
  }

  public lessonValidation(): boolean {
    let exerciseData;
    for (let i = 0; i < this.lessonTypes.length; i++) {
      for (let j = 0; j < this.lessonEntity[this.lessonTypes[i]].length; j++) {
        if (this.lessonEntity[this.lessonTypes[i]][j]['type'] >= 0) {
          exerciseData = this.lessonEntity[this.lessonTypes[i]][j]['data'];
        } else {
          exerciseData = this.lessonEntity[this.lessonTypes[i]][j];
        }
        if (exerciseData['validationStatus'] && exerciseData['validationStatus'] === 'invalid') {
          return false;
        }
      }
    }
    return true;
  }

  public sendUserAnswers(pageType) {
    const exercises = this.userLesson[pageType];
    for (let i = 0; i < exercises.length; i++) {
      exercises[i]['feedback'] = [];
      // switch (exercises[i]['data']['type']) {
      //   case -2:
      //     break;
      //   case -1:
      //     break;
      //   case 2:
          // exercises[i]['data']['sentencesList'].forEach((item, index) => {
          //   if (!item['answerSample']) {
          //     exercises[i]['data']['sentencesList'].splice(index, 1);
          //   }
          // });
        //   break;
        // default:
        //   break;
      // }
    }
    this.getFeedbackList(this.userLesson[pageType],
      (data) => {
        this.userLesson[pageType] = data['data'];
        this.userLesson[pageType].forEach((exercise, index) => {
          if (exercise['data']['type'] === -1) {
            if (exercise['feedback']) {
              exercise['commonFeedback'] = {
                isError: false,
                isSuccess: false
              };
              let success = 0;
              for (let i = 0; i < exercise['feedback'].length; i++) {
                if (exercise['feedback'][i]['isError'] === true) {
                  exercise['commonFeedback']['isError'] = true;
                  break;
                }
                if (exercise['feedback'][i]['isSuccess'] === true) {
                  success++;
                }
              }
              if (exercise['feedback'].length === success) {
                exercise['commonFeedback']['isSuccess'] = true;
              }
            }
          }
        });
      },
      (error) => {
        // console.log(error);
      });
  }

  public getUserBlankById(lessonID, params, response) {
    this.httpService.get(
      `/lessons/user-blank/${lessonID}`,
      params,
      (data) => {
        this.userLesson = data.data['studentsViewLesson'];
        response(data);
      },
      () => null,
      () => null
    );
  }

  public getLessonById(lessonID, params, response) {
    this.httpService.get(
      `/lessons/build-lesson/${lessonID}`,
      params,
      (data) => {
        this.lessonEntity = data.data['lesson'];
        this.userLesson = data.data['studentsViewLesson'];
        response(data);
      },
      () => null,
      () => null
    );
  }

  public updateLessonById(requestData, response, error) {
    // console.log(requestData);
    this.httpService.post(
      `/lessons/build-lesson`,
      requestData,
      (data) => {
        this.lessonEntity = data.data['lesson'];
        this.userLesson = data.data['studentsViewLesson'];
        response(data);
      },
      () => null,
      (err) => error(err)
    );
  }

  public uploadMediaData(finalCallback) {
    let sentencesList;
    this.mediaQueriesCounter = 0;
    for (const type in this.lessonEntity) {
      if (this.lessonEntity.hasOwnProperty(type)) {
        for (const type1 in this.exerciseMediaData) {
          if (this.exerciseMediaData.hasOwnProperty(type1)) {
            if (type === type1) {
              this.mediaQueriesCounter += this.exerciseMediaData[type1].length;
              this.exerciseMediaData[type1].forEach((item) => {
                if (this.lessonEntity[type1][item['s_index']]) {
                  sentencesList = this.lessonEntity[type1][item['s_index']]['data']['sentencesList'];
                  for (let i = 0; i < sentencesList.length; i++) {
                    if (Number(sentencesList[i]['media_id']) === Number(item['media_id'])) {
                      item['question_id'] = sentencesList[i]['id'];
                      if (sentencesList[i]['mediaData'] === '') {
                        this.sendFormData(item, (data) => {
                          this.mediaQueriesCounter--;
                          if (this.mediaQueriesCounter === 0) {
                            this.exerciseMediaData[type1] = [];
                            this.lessonEntity = data['data']['lesson'];
                            const path: (string|number)[] = [type1, item['s_index'], 'data', 'sentencesList', i, 'mediaData'];
                            if (get(this.userLesson, path) === '') {
                              set(this.userLesson, path, get(this.lessonEntity, path, ''));
                            }
                            // console.log('finalCallback: ', data);
                            finalCallback(data);
                          }
                        });
                      }
                      break;
                    }
                  }
                }
              });
            }
          }
        }
      }
    }
  }

  public checkAndDeleteMediaDataItems(tab_type, ex_index) {
    // console.log(this.lessonEntity[tab_type][ex_index]['data']);
    if (this.lessonEntity[tab_type][ex_index]['data']['sentencesList']) {
      this.lessonEntity[tab_type][ex_index]['data']['sentencesList'].forEach((item) => {
        if (item['media_id']) {
          this.exerciseMediaData[tab_type].forEach((m_d, index) => {
            if (Number(m_d['media_id']) === Number(item['media_id'])) {
              this.exerciseMediaData[tab_type].splice(index, 1);
            }
          });
        }
      });
    }
  }

  private sendFormData(media_data, callback) {
    // console.log(media_data);
    const formData: FormData = new FormData();
    formData.append('lesson_id', this.lessonEntity['id']);
    formData.append('type_id', media_data['type_id']);
    formData.append('question_id', media_data['question_id']);
    formData.append('file', media_data.file, media_data.file.name);

    // console.log(formData);
    this.http.post(
      AppSettings.BASE_URL + '/lessons/build-lesson/media',
      formData
    ).subscribe((data) => {
      // console.log(data);
      callback(data);
    }, (err) => {
      // console.log(err);
    });
  }

  public deleteQuestion(type, i) {
    const id = this.lessonEntity[type][i]['id'];
    if (id) {
      this.deleteExerciseById(id,
        (data) => {
          this.lessonEntity[type].splice(i, 1);
        },
        (error) => {
          // console.log(error);
        }
      );
    } else {
      this.lessonEntity[type].splice(i, 1);
    }
  }

  public addQuestionItem(i, exType, pageType) {
    switch (exType) {
      case -2:
        const random_id = this.generateRandomId(this.lessonEntity[pageType][i].selected);
        if (this.lessonEntity[pageType][i].selected.length === 0) {
          this.lessonEntity[pageType][i]['answer'] = random_id;
        }
        this.lessonEntity[pageType][i].selected.push(random_id);
        break;
      case -1:
        this.lessonEntity[pageType][i].selected.push(false);
        break;
    }
    this.lessonEntity[pageType][i].inputs.push({text: '', id: null});
  }

  public deleteQuestionItem(i, j, pageType) {
    const id = this.lessonEntity[pageType][i].inputs[j]['id'];
    if (id) {
      this.deleteAnswerById(id,
        (data) => {
          this.lessonEntity[pageType][i].selected.splice(j, 1);
          this.lessonEntity[pageType][i].inputs.splice(j, 1);
        },
        (error) => {
          // console.log(error);
        }
      );
    } else {
      this.lessonEntity[pageType][i].selected.splice(j, 1);
      this.lessonEntity[pageType][i].inputs.splice(j, 1);
    }
  }

  public getFeedbackList(requestData, response, error) {
    this.httpService.post(
      `/lessons/answers`,
      requestData,
      (data) => {
        response(data);
      },
      () => null,
      (err) => error(err)
    );
  }

  public getAnswersByExerciseId(id, requestData, response, error) {
    this.httpService.post(
      `/lessons/answers/${id}`,
      requestData,
      (data) => {
        response(data);
      },
      () => null,
      (err) => error(err)
    );
  }

  private isStringUrl(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
  }

  public generateRandomId(array) {
    const id = Math.floor((Math.random() * 10000) + 1);
    for (let i = 0; i < array.length; i++) {
      if (Number(array[i]) === id) {
        this.generateRandomId(array);
      }
    }
    return id;
  }

  public deleteExerciseById(id, response, error) {
    this.httpService.delete(
      `/lessons/task/${id}`,
      {},
      (data) => {
        response(data);
      },
      () => null,
      (err) => error(err)
    );
  }

  public deleteSentenceById(id, response, error) {
    this.httpService.delete(
      `/lessons/question/${id}`,
      {},
      (data) => {
        response(data);
      },
      () => null,
      (err) => error(err)
    );
  }

  public deleteAnswerById(id, response, error) {
    this.httpService.delete(
      `/lessons/answer/${id}`,
      {},
      (data) => {
        response(data);
      },
      () => null,
      (err) => error(err)
    );
  }

  public deleteWordById(id, response, error) {
    this.httpService.delete(
      `/lessons/word/${id}`,
      {},
      (data) => {
        response(data);
      },
      () => null,
      (err) => error(err)
    );
  }
}
