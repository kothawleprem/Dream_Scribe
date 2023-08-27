# import os
# from dotenv import load_dotenv
#
# load_dotenv()
# from clarifai.client.user import User
# app = User(user_id="kothawleprem").app(app_id="dreamscribe")
# input_obj = app.inputs()
# app.pat = "28382172c1bf42c9be3af25d437f4b2c"
#
# #input upload from url
# # input_obj.upload_from_url(input_id = 'demo', image_url='https://samples.clarifai.com/metro-north.jpg')
#
# #input upload from filename
# # input_obj.upload_from_file(input_id = 'demo', video_file='demo.mp4')
#
# # text upload
# input_obj.upload_text(input_id = 'demo', raw_text = 'This is a test')


######################################################################################################
# In this section, we set the user authentication, user and app ID, model details, and the URL of
# the text we want as an input. Change these strings to run your own example.
######################################################################################################

from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import resources_pb2, service_pb2, service_pb2_grpc
from clarifai_grpc.grpc.api.status import status_code_pb2

# Your PAT (Personal Access Token) can be found in the portal under Authentification
PAT = '28382172c1bf42c9be3af25d437f4b2c'
# Specify the correct user_id/app_id pairings
# Since you're making inferences outside your app's scope
USER_ID = 'kothawleprem'
APP_ID = 'dreamscribe'
# Change these to whatever model and text URL you want to use
WORKFLOW_ID = 'workflow-76e29b'
TEXT_FILE_URL = 'https://samples.clarifai.com/negative_sentence_12.txt'
TEXT_DATA = "How to score good marks in exam?"

############################################################################
# YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
############################################################################



channel = ClarifaiChannel.get_grpc_channel()
stub = service_pb2_grpc.V2Stub(channel)

metadata = (('authorization', 'Key ' + PAT),)

userDataObject = resources_pb2.UserAppIDSet(user_id=USER_ID, app_id=APP_ID)

response = ""

post_workflow_results_response = stub.PostWorkflowResults(
    service_pb2.PostWorkflowResultsRequest(
        user_app_id=userDataObject,
        workflow_id=WORKFLOW_ID,
        inputs=[
            resources_pb2.Input(
                data=resources_pb2.Data(
                    text=resources_pb2.Text(
                        raw=TEXT_DATA
                    )
                )
            )
        ]
    ),
    metadata=metadata
)
if post_workflow_results_response.status.code != status_code_pb2.SUCCESS:
    print(post_workflow_results_response.status)
    raise Exception("Post workflow results failed, status: " + post_workflow_results_response.status.description)

# We'll get one WorkflowResult for each input we used above. Because of one input, we have here one WorkflowResult
results = post_workflow_results_response.results[0]

# Each model we have in the workflow will produce one output.
for output in results.outputs:
    model = output.model

    print("Predicted concepts for the model `%s`" % model.id)
    for concept in output.data.concepts:
        print("	%s %.2f" % (concept.name, concept.value))

    response += output.data.text.raw + "\n"

# Uncomment this line to print the full Response JSON
print(results)
print(response)
